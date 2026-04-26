'use strict'

const { createCoreController } = require('@strapi/strapi').factories
const { randomBytes } = require('crypto')

module.exports = createCoreController('api::circle.circle', ({ strapi }) => ({
  async create(ctx) {
    const body = ctx.request.body as Record<string, unknown>
    const data = (body?.data as Record<string, unknown>) || {}

    if (!data.inviteToken) {
      ctx.request.body = {
        ...body,
        data: { ...data, inviteToken: randomBytes(16).toString('hex') },
      }
    }

    return super.create(ctx)
  },

  async join(ctx) {
    const { token } = ctx.params
    const userId = ctx.state.user?.id

    if (!token || !userId) {
      return ctx.badRequest('Token and authenticated user required')
    }

    const circles = await strapi.entityService.findMany('api::circle.circle', {
      filters: { inviteToken: token },
    })

    if (circles.length === 0) {
      return ctx.notFound('Einladungslink ungültig oder abgelaufen')
    }

    const circle = circles[0]

    const existingMember = await strapi.db
      .query('api::circle-member.circle-member')
      .findOne({ where: { circle: circle.id, user: userId } })

    if (existingMember) {
      return ctx.send({ message: 'Du bist bereits Mitglied dieses Kreises', circleId: circle.id })
    }

    await strapi.entityService.create('api::circle-member.circle-member', {
      data: { circle: circle.id, user: userId, role: 'member' },
    })

    try {
      await strapi.entityService.create('api::audit-log.audit-log', {
        data: {
          action: 'join_circle',
          entityType: 'circle',
          entityId: String(circle.id),
          details: `Benutzer ${userId} ist Kreis "${circle.name}" beigetreten`,
          user: userId,
        },
      })
    } catch (_) {}

    return ctx.send({ message: 'Willkommen im Kreis!', circleId: circle.id })
  },

  async generateInvite(ctx) {
    const { id } = ctx.params
    const userId = ctx.state.user?.id

    if (!id || !userId) {
      return ctx.badRequest('Circle ID and authenticated user required')
    }

    const circle = await strapi.entityService.findOne('api::circle.circle', id, {
      populate: { owner: true },
    })
    if (!circle) return ctx.notFound('Kreis nicht gefunden')

    if (circle.owner?.id !== userId) {
      return ctx.forbidden('Nur der Kreis-Ersteller kann Einladungen erstellen')
    }

    const newToken = circle.inviteToken || randomBytes(8).toString('hex')

    await strapi.entityService.update('api::circle.circle', id, {
      data: { inviteToken: newToken },
    })

    return ctx.send({ inviteToken: newToken, inviteUrl: `/circles/join/${newToken}` })
  },

  async members(ctx) {
    const { id } = ctx.params
    const userId = ctx.state.user?.id

    if (!id || !userId) {
      return ctx.badRequest('Circle ID and authenticated user required')
    }

    const circle = await strapi.entityService.findOne('api::circle.circle', id, {
      populate: { owner: true },
    })

    if (!circle) return ctx.notFound('Kreis nicht gefunden')

    const circleMembers = await strapi.entityService.findMany(
      'api::circle-member.circle-member',
      {
        filters: { circle: id },
        populate: { user: { fields: ['id', 'username', 'email'] } },
      }
    )

    const isMember = circleMembers.some((m: { user?: { id: number } }) => m.user?.id === userId)
    const isOwner = circle.owner?.id === userId

    if (!isMember && !isOwner) {
      return ctx.forbidden('Kein Zugriff — du bist kein Mitglied dieses Kreises')
    }

    return ctx.send({ members: circleMembers, owner: circle.owner })
  },
}))
