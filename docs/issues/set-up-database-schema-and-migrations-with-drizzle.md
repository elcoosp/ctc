---
id: set-up-database-schema-and-migrations-with-drizzle
title: Set up database schema and migrations with Drizzle ORM and Turso
labels:
  - database
  - infrastructure
  - must
  - feature
  - 'size:medium'
assignees:
  - elcoosp
references:
  - ../spec/impl-plan.md#task-11-set-up-database-schema-and-migrations
  - ../spec/archi.md#adr-002-database--turso-with-drizzle-orm
state: closed
createdAt: '2026-03-14T16:54:41.930Z'
priority: must
effort: 1d
dependencies: []
---

## Context

This is the foundational task for Sprint 1. We need to establish the database layer using Drizzle ORM with Turso (SQLite) before any other features can be built. The schema must support users, workflows, workflow versions, runs, and connectors as defined in the architecture specification.

**Related Plan Section:**
- [Task 1.1: Set up database schema and migrations](../spec/impl-plan.md#task-11-set-up-database-schema-and-migrations)

**Related Requirements:**
- [REQ-FUNC-001](../spec/srs.md#req-func-001) - GitHub OAuth (requires users table)
- [REQ-FUNC-003](../spec/srs.md#req-func-003) - Workflow CRUD (requires workflows table)

**Related Architecture:**
- [ADR-002: Database – Turso with Drizzle ORM](../spec/archi.md#adr-002-database--turso-with-drizzle-orm)

## Implementation Status (Completed)

The database schema and migrations have been fully implemented:

- `db/schema.ts` defines all tables (`users`, `accounts`, `sessions`, `verifications`, `workflows`, `workflowVersions`, `runs`, `connectors`) with proper relationships and cascade deletes.
- `db/client.ts` creates a Drizzle client using `better-sqlite3` (local SQLite; can be swapped for Turso later).
- Migration `20260314181531_noisy_captain_flint` exists and contains the initial schema.
- `package.json` includes scripts `db:generate` and `db:migrate`.
- `.env.example` documents `DB_FILE_NAME` for local SQLite.

All acceptance criteria have been met. The database is ready for use.

## Closing Note

This task is complete. No further work required.
