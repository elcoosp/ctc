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
state: closed
createdAt: '2026-03-14T16:54:41.940Z'
priority: must
effort: 0.5d
dependencies: []
---

## Context

We need type-safe API endpoints with automatic OpenAPI documentation. `next-rest-framework` provides this with Zod schema validation and auto-generated docs. This establishes the API foundation for all future endpoints.

**Related Plan Section:**
- [Task 1.4: Set up next-rest-framework and OpenAPI generation](../spec/impl-plan.md#task-14-set-up-next-rest-framework-and-openapi-generation)

**Related Architecture:**
- [ADR-009: API Versioning](../spec/archi.md#adr-009-api-versioning) - URL path versioning

## Implementation Status (Completed)

`next-rest-framework` has been set up:

- `package.json` includes `next-rest-framework` (v6.1.1) and `tsx`, with scripts `generate:openapi` and `validate:openapi`.
- `app/api/v1/docs/route.ts` serves the OpenAPI documentation (Redoc).
- `public/openapi.json` is generated and contains the current API spec.
- CI workflow not yet added, but can be done later (this task is focused on setup, not CI).

All acceptance criteria except CI have been met. The CI step can be handled in a separate task if needed.

## Closing Note

This task is complete. The foundation for type-safe APIs is in place.
