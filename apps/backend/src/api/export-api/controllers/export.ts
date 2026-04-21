/**
 * Export API Controller
 */
import type { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  /**
   * Export all user data
   */
  async exportData(ctx) {
    const userId = ctx.state.user?.id;
    
    if (!userId) {
      ctx.throw(401, 'Unauthorized');
    }

    try {
      const exportService = strapi.service('plugin::export') as any;
      const data = await exportService.exportUserData(userId);
      
      ctx.body = data;
    } catch (error) {
      ctx.throw(500, 'Failed to export data');
    }
  },

  /**
   * Schedule account deletion
   */
  async scheduleDelete(ctx) {
    const userId = ctx.state.user?.id;
    
    if (!userId) {
      ctx.throw(401, 'Unauthorized');
    }

    try {
      const exportService = strapi.service('plugin::export') as any;
      const result = await exportService.scheduleDeletion(userId);
      
      ctx.body = result;
    } catch (error) {
      ctx.throw(500, 'Failed to schedule deletion');
    }
  },

  /**
   * Cancel scheduled deletion
   */
  async cancelDelete(ctx) {
    const userId = ctx.state.user?.id;
    
    if (!userId) {
      ctx.throw(401, 'Unauthorized');
    }

    try {
      const exportService = strapi.service('plugin::export') as any;
      const result = await exportService.cancelDeletion(userId);
      
      ctx.body = result;
    } catch (error) {
      ctx.throw(500, 'Failed to cancel deletion');
    }
  },
});