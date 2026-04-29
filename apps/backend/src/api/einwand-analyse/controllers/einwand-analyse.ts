import type { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async analyse(ctx) {
    const body = ctx.request.body?.data ?? ctx.request.body;
    const einwand = body?.einwand;

    if (!einwand || typeof einwand !== 'string' || einwand.trim().length === 0) {
      return ctx.badRequest('einwand ist ein Pflichtfeld.');
    }

    if (einwand.trim().length < 10) {
      return ctx.badRequest('Einwand muss mindestens 10 Zeichen lang sein.');
    }

    const service = strapi.service('api::einwand-analyse.einwand-analyse') as any;
    const result = await service.analyse(einwand.trim());

    ctx.body = {
      data: {
        ...result,
        _meta: {
          typ: 'KI-Einschätzung',
          hinweis:
            'Diese Analyse ist eine KI-gestützte Einschätzung. Der Mensch entscheidet final über die Validität des Einwands.',
        },
      },
    };
  },
});
