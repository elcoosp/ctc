---
id: add-environment-validation-utility-for-secure-conf
title: Add environment validation utility for secure configuration
labels:
  - backend
  - infrastructure
  - must
  - feature
  - 'size:small'
assignees:
  - elcoosp
references:
  - ../spec/impl-plan.md#task-53-documentation-and-environment-validation
  - ../spec/tech-desing-api.md#9-environment-variables
state: open
createdAt: '2026-03-14T16:57:03.528Z'
priority: must
effort: 0.5d
dependencies:
  - task-1.1-database-schema
  - task-1.2-better-auth-github
---

## Context

The application requires several environment variables for database, authentication, GitHub, and LLM configuration. We need a validation utility to ensure all required variables are present and properly formatted at startup.

**Related Plan Section:**
- [Task 5.3: Documentation and environment validation](../spec/impl-plan.md#task-53-documentation-and-environment-validation)

**Related Requirements:**
- [NFR-SEC-002](../spec/srs.md#nfr-sec-002) - Token Encryption
- [NFR-SEC-003](../spec/srs.md#nfr-sec-003) - Code Disposal

**Related Architecture:**
- [Section 9: Environment Variables](../spec/tech-desing-api.md#9-environment-variables)

## Problem Statement

We need to create a Zod-based environment validation utility that validates all required environment variables at application startup, providing clear error messages for missing or invalid configuration.

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `lib/env.ts` — Environment validation utility with Zod schema
- `lib/auth/server.ts` — Import and use validated env
- `db/client.ts` — Import and use validated env

**Key interfaces:**
- `envSchema` — Zod schema for all environment variables
- `env` — Validated and typed environment object
- Required vars: `DB_FILE_NAME`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `ENCRYPTION_KEY`
- Optional vars: `OLLAMA_BASE_URL`, `OLLAMA_DEFAULT_MODEL`, `CRON_SECRET`

## Acceptance Criteria

- [ ] Zod schema validates all required environment variables
- [ ] `DB_FILE_NAME` validated as non-empty string
- [ ] `BETTER_AUTH_SECRET` validated as minimum 32 characters
- [ ] `ENCRYPTION_KEY` validated as 32 characters
- [ ] `BETTER_AUTH_URL` validated as URL format
- [ ] `OLLAMA_BASE_URL` validated as URL format if present
- [ ] Clear error messages for missing or invalid variables
- [ ] Validation runs at module import time
- [ ] Validated env object used in `auth/server.ts` and `db/client.ts`
- [ ] `.env.example` already includes all variables

## Testing Requirements

**Unit tests:**
- Test validation passes with valid env
- Test validation fails with missing required vars
- Test validation fails with invalid formats

## Dependencies

- **Blocked by:** Task 1.1 (Database schema), Task 1.2 (better-auth)
- **Blocks:** None

## Effort Estimate

- **Complexity:** Low
- **Effort:** 0.5d
