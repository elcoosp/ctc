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
state: open
createdAt: '2026-03-14T16:54:41.930Z'
priority: must
effort: 1d
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

## Problem Statement

We need to define the complete database schema for the AI Content Agent Dashboard, including tables for users (with auth fields), workflows, workflow versions, runs, and connectors. The schema must use Turso-native SQLite types and support the relationships defined in the architecture specification.

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `db/schema.ts` — Define all tables using Drizzle's sqlite-core
- `db/client.ts` — Create database client with Turso connection
- `db/migrations/` — Folder for generated migrations
- `package.json` — Add Drizzle scripts (db:generate, db:migrate)
- `.env.example` — Document required environment variables

**Key interfaces:**
- `users` table — id, githubId, email, name, avatarUrl, plan, usageMonth, sandboxUsed, timestamps
- `accounts` table — NextAuth adapter table
- `sessions` table — NextAuth adapter table
- `verificationTokens` table — NextAuth adapter table
- `workflows` table — id, userId, name, currentVersionId, timestamps
- `workflowVersions` table — id, workflowId, version, definition (JSON), changelog, timestamp
- `runs` table — id, workflowId, status, startedAt, completedAt, nodeResults (JSON), finalArtifacts (JSON), sandbox
- `connectors` table — id, userId, type, config (JSON), timestamps

## Acceptance Criteria

- [ ] Drizzle ORM and Turso client dependencies installed
- [ ] Schema defined with all tables matching architecture specification
- [ ] Database client created with proper connection handling
- [ ] Migration scripts added to package.json
- [ ] Initial migration generated successfully
- [ ] .env.example created with all required variables
- [ ] All tables use Turso-native SQLite types (text, integer)
- [ ] Foreign key relationships properly defined with cascade deletes

## Testing Requirements

**Unit tests:**
- Verify schema exports are valid Drizzle table definitions
- Test that migrations can be generated without errors

## Dependencies

- **Blocked by:** None
- **Blocks:** Task 1.2 (NextAuth setup), Task 2.1 (Workflow API), Task 3.1 (Run execution)

## Effort Estimate

- **Complexity:** Medium
- **Effort:** 1d
