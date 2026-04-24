'use strict'

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::round.round', ({ strapi }) => ({
  /**
   * Find participants who haven't voted yet in a round
   */
  async getNonVoters(roundId) {
    const round = await strapi.entityService.findOne('api::round.round', roundId, {
      populate: ['project', 'project.participants', 'votes', 'votes.user'],
    });

    if (!round) return [];

    const voters = (round.votes || []).map((v) => v.user?.id).filter(Boolean);
    const participants = (round.project?.participants || []).map((p) => p.id);

    return participants.filter((pId) => !voters.includes(pId));
  },

  /**
   * Check if a reminder should be sent for a round
   * Returns rounds that are in voting phase and past the reminder threshold
   */
  async getRoundsNeedingReminder(reminderAfterHours = 48) {
    const threshold = new Date();
    threshold.setHours(threshold.getHours() - reminderAfterHours);

    const rounds = await strapi.entityService.findMany('api::round.round', {
      filters: {
        status: 'voting',
        phaseStartedAt: { $lt: threshold.toISOString() },
        reminderSent: { $ne: true },
      },
      populate: ['project', 'project.participants', 'votes', 'votes.user'],
    });

    return rounds;
  },

  /**
   * Send reminders to non-voters for all eligible rounds
   */
  async sendReminders(reminderAfterHours = 48) {
    const rounds = await this.getRoundsNeedingReminder(reminderAfterHours);
    const results = [];

    for (const round of rounds) {
      const nonVoters = await this.getNonVoters(round.id);

      if (nonVoters.length > 0) {
        // In production, this would trigger email/notification
        // For now, log the reminder
        try {
          await strapi.entityService.create('api::audit-log.audit-log', {
            data: {
              action: 'phase_transition',
              entityType: 'round',
              entityId: String(round.id),
              details: `Erinnerung gesendet an ${nonVoters.length} Nicht-Abstimmende`,
              project: round.project?.id,
            },
          });
        } catch (_) {}

        results.push({
          roundId: round.id,
          roundNumber: round.roundNumber,
          projectName: round.project?.name,
          nonVoterCount: nonVoters.length,
          nonVoterIds: nonVoters,
        });
      }

      // Mark reminder as sent (only one per round)
      await strapi.entityService.update('api::round.round', round.id, {
        data: { reminderSent: true },
      });
    }

    return results;
  },
}));
