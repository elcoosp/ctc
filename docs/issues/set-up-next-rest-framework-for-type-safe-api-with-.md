---
id: set-up-next-rest-framework-for-type-safe-api-with-
title: Set up next-rest-framework for type-safe API with OpenAPI generation
labels:
  - backend
  - infrastructure
  - must
  - feature
  - 'size:small'
assignees:
  - elcoosp
references:
  - >-
    ../spec/impl-plan.md#task-14-set-up-next-rest-framework-and-openapi-generation
  - ../spec/archi.md#adr-009-api-versioning
state: open
createdAt: '2026-03-14T16:54:41.940Z'
priority: must
effort: 0.5d
---
## Context

We need type-safe API endpoints with automatic OpenAPI documentation. next-rest-framework provides this with Zod schema validation and auto-generated docs. This establishes the API foundation for all future endpoints.

**Related Plan Section:**
- [Task 1.4: Set up next-rest-framework and OpenAPI generation](../spec/impl-plan.md#task-14-set-up-next-rest-framework-and-openapi-generation)

**Related Architecture:**
- [ADR-009: API Versioning](../spec/archi.md#adr-009-api-versioning) - URL path versioning

## Problem Statement

We need to configure next-rest-framework to provide type-safe API routes with automatic OpenAPI spec generation. The docs endpoint should be accessible and CI should validate that the spec stays in sync.

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `package.json` — Add next-rest-framework and tsx dependencies, add generate/validate scripts
- `app/api/v1/docs/route.ts` — OpenAPI documentation endpoint
- `.github/workflows/ci.yml` — Add OpenAPI validation step

**Key interfaces:**
- `docsRoute()` — Redoc documentation endpoint
- `generate:openapi` script — Generates public/openapi.json
- `validate:openapi` script — Validates spec is up-to-date

## Acceptance Criteria

- [ ] next-rest-framework v5.1.12 installed
- [ ] tsx installed as dev dependency
- [ ] Docs endpoint created at /api/v1/docs
- [ ] OpenAPI generation script works
- [ ] public/openapi.json generated successfully
- [ ] CI workflow includes validate:openapi step
- [ ] API versioning follows /api/v1/ pattern

## Testing Requirements

**CI tests:**
- OpenAPI validation passes in CI
- Generated spec matches code

## Dependencies

- **Blocked by:** None
- **Blocks:** Task 1.5 (GitHub repos API), Task 2.1 (Workflow API), Task 3.1 (Run API)

## Effort Estimate

- **Complexity:** Low
- **Effort:** 0.5d
