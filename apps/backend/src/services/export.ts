/**
 * Export Service
 * Exportiert User-Daten für DSGVO
 */
import type { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  /**
   * Export all user data as JSON
   */
  async exportUserData(userId: number) {
    const entityManager = strapi.db?.entityManager;
    if (!entityManager) {
      throw new Error('Entity manager not available');
    }

    const user = await strapi.entityService.findOne('plugin::users-permissions.user', userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Fetch all user data
    const [projects, rounds, votes, objections, comments] = await Promise.all([
      // Projects created by user
      strapi.entityService.findMany('api::project.project', {
        filters: { creator: userId },
      }),
      // Rounds where user participated
      strapi.entityService.findMany('api::round.round', {
        filters: { participants: userId },
      }),
      // Votes by user
      strapi.entityService.findMany('api::vote.vote', {
        filters: { user: userId },
      }),
      // Objections raised by user
      strapi.entityService.findMany('api::objection.objection', {
        filters: { creator: userId },
      }),
      // Comments by user
      strapi.entityService.findMany('api::comment.comment', {
        filters: { author: userId },
      }),
    ]);

    return {
      exportedAt: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      data: {
        projects: projects || [],
        rounds: rounds || [],
        votes: votes || [],
        objections: objections || [],
        comments: comments || [],
      },
    };
  },

  /**
   * Delete user account (with safety delay)
   * The account is marked for deletion and actually deleted after 30 days
   */
  async scheduleDeletion(userId: number) {
    // Get the user
    const user = await strapi.entityService.findOne('plugin::users-permissions.user', userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if already scheduled
    if (user.deletionScheduledAt) {
      const scheduledDate = new Date(user.deletionScheduledAt);
      const now = new Date();
      
      if (scheduledDate > now) {
        // Already scheduled - update to new date (30 days from now)
        const newScheduledDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        await strapi.entityService.update('plugin::users-permissions.user', userId, {
          data: { deletionScheduledAt: newScheduledDate.toISOString() },
        });
        return { scheduledAt: newScheduledDate.toISOString(), updated: true };
      }
    }

    // Schedule new deletion (30 days from now)
    const scheduledDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    
    await strapi.entityService.update('plugin::users-permissions.user', userId, {
      data: { deletionScheduledAt: scheduledDate.toISOString() },
    });

    return { scheduledAt: scheduledDate.toISOString(), updated: false };
  },

  /**
   * Cancel scheduled deletion
   */
  async cancelDeletion(userId: number) {
    const user = await strapi.entityService.findOne('plugin::users-permissions.user', userId);
    if (!user) {
      throw new Error('User not found');
    }

    await strapi.entityService.update('plugin::users-permissions.user', userId, {
      data: { deletionScheduledAt: null },
    });

    return { cancelled: true };
  },

  /**
   * Execute scheduled deletions (called by cron)
   */
  async executeScheduledDeletions() {
    const now = new Date().toISOString();
    
    // Find users scheduled for deletion
    const usersToDelete = await strapi.entityService.findMany('plugin::users-permissions.user', {
      filters: { 
        deletionScheduledAt: { $lte: now },
      },
    });

    let deletedCount = 0;
    
    for (const user of usersToDelete || []) {
      // Delete user's votes, objections, comments (not projects/rounds that affect others)
      await Promise.all([
        strapi.entityService.deleteMany('api::vote.vote', {
          filters: { user: user.id },
        }),
        strapi.entityService.deleteMany('api::objection.objection', {
          filters: { creator: user.id },
        }),
        strapi.entityService.deleteMany('api::comment.comment', {
          filters: { author: user.id },
        }),
      ]);

      // Anonymize user account (keep entry for audit trail)
      await strapi.entityService.update('plugin::users-permissions.user', user.id, {
        data: {
          email: `deleted-${user.id}@adlix-consent.invalid`,
          username: `deleted-${user.id}`,
          deletionScheduledAt: null,
          // Keep ID but mark as deleted
        },
      });

      deletedCount++;
    }

    return { deletedCount };
  },
});