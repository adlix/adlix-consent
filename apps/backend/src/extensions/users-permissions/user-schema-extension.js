"use strict";

/**
 * Strapi User Schema Extension
 *
 * Adds custom fields to the users-permissions User content type:
 * - loginCode: string (6-digit one-time login code)
 * - loginCodeExpires: datetime (expiry timestamp for the code)
 * - stripeCustomerId: string (Stripe customer ID for billing)
 * - plan: enumeration (free, pro) — user's subscription plan
 *
 * These fields need to be created in the Strapi Admin Panel:
 * Settings → Users-Permissions plugin → User content type → "Add another field"
 *
 * Or via the Content-Type Builder in development mode.
 *
 * After adding fields, run: npm run build && npm run develop
 */

module.exports = {
  // Field definitions for reference — add these via Strapi admin
  customUserFields: {
    loginCode: {
      type: "string",
      private: true, // Not exposed via API
    },
    loginCodeExpires: {
      type: "datetime",
      private: true,
    },
    stripeCustomerId: {
      type: "string",
      private: true,
    },
    plan: {
      type: "enumeration",
      enum: ["free", "pro"],
      default: "free",
    },
  },
};
