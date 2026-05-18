# ── Dev-Stage: live source mount, hot reload ───────────────────────────────
FROM node:20-alpine AS dev

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY . .

# Source wird per Volume gemountet (docker-compose.dev.yml)
EXPOSE 1337
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "develop"]

# ── Prod-Stage: minimales Runtime-Image ───────────────────────────────────
FROM node:20-alpine AS prod

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci --omit=dev

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY . .

RUN mkdir -p public/uploads

EXPOSE 1337
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "start"]
