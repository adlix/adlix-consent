# ── Dev-Stage: live source mount, hot reload ───────────────────────────────
FROM node:20-alpine AS dev

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

# Source wird per Volume gemountet (docker-compose.dev.yml)
EXPOSE 1337
CMD ["npm", "run", "develop"]

# ── Prod-Stage: minimales Runtime-Image ───────────────────────────────────
FROM node:20-alpine AS prod

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN mkdir -p public/uploads

EXPOSE 1337
CMD ["npm", "run", "start"]
