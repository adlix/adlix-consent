# ── Dev-Stage: live source mount, hot reload ───────────────────────────────
FROM node:20-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Source wird per Volume gemountet (docker-compose.dev.yml)
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]

# ── Builder-Stage: next build ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Dummy-Env damit next build nicht auf fehlende Vars bricht
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_APP_URL=https://consent.adlix-club.de
ENV NEXT_PUBLIC_SITE_URL=https://consent.adlix-club.de
ENV NEXT_PUBLIC_STRAPI_URL=https://admin.adlix-club.de
ENV NEXT_PUBLIC_STRAPI_API_URL=https://admin.adlix-club.de/api

RUN npm run build

# ── Prod-Stage: minimales Runtime-Image ───────────────────────────────────
FROM node:20-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
