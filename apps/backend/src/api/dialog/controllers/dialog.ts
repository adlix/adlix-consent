'use strict'

const { createCoreController } = require('@strapi/strapi').factories

const PHASE_TYPES = ['understand', 'validate', 'solutions', 'synthesize', 'present', 'escalate']

module.exports = createCoreController('api::dialog.dialog', ({ strapi }) => ({
  /**
   * POST /dialogs — create dialog and initialize first phase
   */
  async create(ctx) {
    const { data } = ctx.request.body

    const dialog = await strapi.documents('api::dialog.dialog').create({
      data: {
        ...data,
        currentPhase: 1,
        status: 'active',
      },
    })

    // Auto-create phase 1
    await strapi.documents('api::dialog-phase.dialog-phase').create({
      data: {
        phaseNumber: 1,
        type: 'understand',
        status: 'active',
        startedAt: new Date().toISOString(),
        dialog: dialog.id,
      },
    })

    const populated = await strapi.documents('api::dialog.dialog').findOne({
      documentId: dialog.documentId,
      populate: { phases: { populate: ['beitraege'] }, objection: true, project: true },
    })

    ctx.body = { data: populated }
  },

  /**
   * POST /dialogs/:id/advance — complete current phase and start next
   */
  async advance(ctx) {
    const { id } = ctx.params

    const dialog = await strapi.documents('api::dialog.dialog').findOne({
      documentId: id,
      populate: { phases: true },
    })

    if (!dialog) return ctx.notFound('Dialog nicht gefunden.')
    if (dialog.status !== 'active') return ctx.badRequest('Dialog ist nicht aktiv.')

    const currentPhaseNum = dialog.currentPhase
    if (currentPhaseNum >= 6) return ctx.badRequest('Dialog ist bereits in der letzten Phase.')

    // Complete the current phase
    const currentPhase = (dialog.phases as { phaseNumber: number; documentId: string }[]).find(
      (p) => p.phaseNumber === currentPhaseNum
    )
    if (currentPhase) {
      await strapi.documents('api::dialog-phase.dialog-phase').update({
        documentId: currentPhase.documentId,
        data: { status: 'completed', completedAt: new Date().toISOString() },
      })
    }

    const nextPhaseNum = currentPhaseNum + 1
    const nextPhaseType = PHASE_TYPES[nextPhaseNum - 1]

    // Create next phase
    await strapi.documents('api::dialog-phase.dialog-phase').create({
      data: {
        phaseNumber: nextPhaseNum,
        type: nextPhaseType,
        status: 'active',
        startedAt: new Date().toISOString(),
        dialog: dialog.id,
      },
    })

    const updated = await strapi.documents('api::dialog.dialog').update({
      documentId: id,
      data: { currentPhase: nextPhaseNum },
    })

    const populated = await strapi.documents('api::dialog.dialog').findOne({
      documentId: id,
      populate: { phases: { populate: ['beitraege'] }, objection: true, project: true },
    })

    ctx.body = { data: populated }
  },

  /**
   * POST /dialogs/:id/complete — mark dialog as completed or escalated
   */
  async complete(ctx) {
    const { id } = ctx.params
    const { status } = ctx.request.body

    if (!['completed', 'escalated'].includes(status)) {
      return ctx.badRequest('Ungültiger Status. Erlaubt: completed, escalated.')
    }

    const dialog = await strapi.documents('api::dialog.dialog').findOne({
      documentId: id,
      populate: { phases: true },
    })
    if (!dialog) return ctx.notFound('Dialog nicht gefunden.')

    // Complete the current phase
    const currentPhase = (dialog.phases as { phaseNumber: number; documentId: string; status: string }[]).find(
      (p) => p.phaseNumber === dialog.currentPhase && p.status === 'active'
    )
    if (currentPhase) {
      await strapi.documents('api::dialog-phase.dialog-phase').update({
        documentId: currentPhase.documentId,
        data: { status: 'completed', completedAt: new Date().toISOString() },
      })
    }

    const updated = await strapi.documents('api::dialog.dialog').update({
      documentId: id,
      data: { status },
    })

    ctx.body = { data: updated }
  },
}))
