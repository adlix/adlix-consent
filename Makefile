DC      := docker compose
DC_DEV  := $(DC) -f docker-compose.yml -f docker-compose.dev.yml
DC_PROD := $(DC) -f docker-compose.yml -f docker-compose.prod.yml

.DEFAULT_GOAL := help

# ── Hilfe ─────────────────────────────────────────────────────────────────────
.PHONY: help
help:
	@echo ""
	@echo "  adlix consent — Build-Befehle"
	@echo ""
	@echo "  Entwicklung"
	@echo "    make dev          Container starten (hot reload, volume mounts)"
	@echo "    make dev-build    Images neu bauen + starten"
	@echo "    make down         Alle Container stoppen"
	@echo "    make restart      Alle Container neu starten"
	@echo ""
	@echo "  Produktion"
	@echo "    make prod         Prod-Container starten"
	@echo "    make prod-build   Prod-Images neu bauen + starten"
	@echo ""
	@echo "  Einzelne Services"
	@echo "    make build-fe     Nur Frontend-Image neu bauen"
	@echo "    make build-be     Nur Backend-Image neu bauen"
	@echo "    make restart-fe   Nur Frontend-Container neu starten"
	@echo "    make restart-be   Nur Backend-Container neu starten"
	@echo ""
	@echo "  Logs"
	@echo "    make logs         Logs aller Container (folgen)"
	@echo "    make logs-fe      Logs Frontend"
	@echo "    make logs-be      Logs Backend"
	@echo ""
	@echo "  Wartung"
	@echo "    make ps           Container-Status anzeigen"
	@echo "    make clean        Gestoppte Container + dangling Images entfernen"
	@echo "    make shell-fe     Shell im Frontend-Container öffnen"
	@echo "    make shell-be     Shell im Backend-Container öffnen"
	@echo ""

# ── Entwicklung ───────────────────────────────────────────────────────────────
.PHONY: dev
dev:
	$(DC_DEV) up -d

.PHONY: dev-build
dev-build:
	$(DC_DEV) up -d --build

.PHONY: down
down:
	$(DC_DEV) down

.PHONY: restart
restart:
	$(DC_DEV) restart

# ── Produktion ────────────────────────────────────────────────────────────────
.PHONY: prod
prod:
	$(DC_PROD) up -d

.PHONY: prod-build
prod-build:
	$(DC_PROD) up -d --build

.PHONY: prod-down
prod-down:
	$(DC_PROD) down

# ── Einzelne Services ─────────────────────────────────────────────────────────
.PHONY: build-fe
build-fe:
	$(DC_DEV) build frontend
	$(DC_DEV) up -d --no-deps frontend

.PHONY: build-be
build-be:
	$(DC_DEV) build backend
	$(DC_DEV) up -d --no-deps backend

.PHONY: restart-fe
restart-fe:
	$(DC_DEV) restart frontend

.PHONY: restart-be
restart-be:
	$(DC_DEV) restart backend

# ── Logs ──────────────────────────────────────────────────────────────────────
.PHONY: logs
logs:
	$(DC_DEV) logs -f

.PHONY: logs-fe
logs-fe:
	$(DC_DEV) logs -f frontend

.PHONY: logs-be
logs-be:
	$(DC_DEV) logs -f backend

# ── Wartung ───────────────────────────────────────────────────────────────────
.PHONY: ps
ps:
	$(DC_DEV) ps

.PHONY: clean
clean:
	docker container prune -f
	docker image prune -f

.PHONY: shell-fe
shell-fe:
	docker exec -it consent_next sh

.PHONY: shell-be
shell-be:
	docker exec -it consent_strapi sh

# ── Seeding ───────────────────────────────────────────────────────────────────
.PHONY: seed-abos
seed-abos:
	STRAPI_URL=http://localhost:1337 STRAPI_API_TOKEN=$(STRAPI_API_TOKEN) \
	  node apps/backend/scripts/seed-abos.js
