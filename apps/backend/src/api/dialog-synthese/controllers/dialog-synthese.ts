import type { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async synthese(ctx) {
    const body = ctx.request.body?.data ?? ctx.request.body;
    const { dialogId } = body ?? {};

    if (!dialogId || typeof dialogId !== 'string' || dialogId.trim().length === 0) {
      return ctx.badRequest('dialogId ist ein Pflichtfeld.');
    }

    // Pro-feature gate: set DIALOG_SYNTHESE_PRO_ENABLED=false to disable
    if (process.env.DIALOG_SYNTHESE_PRO_ENABLED === 'false') {
      return ctx.forbidden('Diese Funktion ist nur im Pro-Plan verfügbar.');
    }

    const service = strapi.service('api::dialog-synthese.dialog-synthese') as any;
    const result = await service.synthese(dialogId.trim());

    if (result.error) {
      return ctx.notFound(result.error);
    }

    ctx.body = {
      data: {
        ...result,
        _meta: {
          typ: 'KI-Einwands-Synthese',
          status: 'entwurf',
          hinweis:
            'Dieser Integrationsentwurf ist eine KI-gestützte Synthese. Er ist ein Entwurf — nicht automatisch übernommen. Der Mensch entscheidet final über die Anpassung des Vorhabens.',
        },
      },
    };
  },
});
