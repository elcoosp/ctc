---
id: create-workflow-model-and-crud-api-endpoints
title: Create workflow model and CRUD API endpoints
labels:
  - backend
  - must
  - feature
  - 'size:medium'
assignees:
  - elcoosp
references:
  - ../spec/impl-plan.md#task-21-create-workflow-model-and-api-async-updates
  - ../spec/srs.md#req-func-003
  - ../spec/srs.md#req-func-005
state: open
createdAt: '2026-03-14T16:55:10.955Z'
priority: must
effort: 1.5d
dependencies:
  - task-1.1-database-schema
  - task-1.2-nextauth-github
  - task-1.4-next-rest-framework
---
## Context

Workflows are the core entity that users create to chain AI agents together. We need a complete CRUD API for workflows with versioning support. Each workflow has a definition (JSON) that specifies nodes and edges.

**Related Plan Section:**
- [Task 2.1: Create workflow model and API](../spec/impl-plan.md#task-21-create-workflow-model-and-api-async-updates)

**Related Requirements:**
- [REQ-FUNC-003](../spec/srs.md#req-func-003) - Workflow CRUD
- [REQ-FUNC-005](../spec/srs.md#req-func-005) - Version History

**Related Architecture:**
- [Database Schema](../spec/archi.md#53-database-schema-conceptual-with-drizzle) - workflows and workflow_versions tables

**Related Tests:**
- [TC-WORKFLOW-001](../spec/test-verification.md#tc-workflow-001) - Create workflow with two nodes
- [TC-WORKFLOW-003](../spec/test-verification.md#tc-workflow-003) - Versioning

## Problem Statement

We need to implement the workflow data model with Zod schemas for validation, and create type-safe API endpoints for creating, reading, updating, and deleting workflows. Updates should create new versions automatically.

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `lib/workflow-engine/types.ts` — Workflow definition Zod schemas
- `app/api/v1/workflows/route.ts` — POST (create) and GET (list) endpoints
- `app/api/v1/workflows/[id]/route.ts` — GET, PUT, DELETE for single workflow
- `app/api/v1/workflows/[id]/versions/route.ts` — GET versions list

**Key interfaces:**
- `workflowDefinitionSchema` — Zod schema for workflow definition (nodes, edges, outputConnectors)
- `nodeSchema` — Zod schema for workflow nodes
- `nodeInputSourceSchema` — Discriminated union for constant vs node input
- `POST /api/v1/workflows` — Create workflow with initial version
- `GET /api/v1/workflows` — List user's workflows
- `GET /api/v1/workflows/:id` — Get single workflow
- `PUT /api/v1/workflows/:id` — Update workflow (creates new version)
- `DELETE /api/v1/workflows/:id` — Delete workflow
- `GET /api/v1/workflows/:id/versions` — List all versions

## Acceptance Criteria

- [ ] Workflow definition schema validates nodes, edges, and output connectors
- [ ] Node input source schema handles constant and node reference types
- [ ] POST endpoint creates workflow with version 1
- [ ] GET endpoint lists only current user's workflows
- [ ] PUT endpoint creates new version automatically
- [ ] DELETE endpoint removes workflow and cascades to versions
- [ ] Versions endpoint returns ordered version history
- [ ] All endpoints use next-rest-framework with Zod validation
- [ ] Authentication required for all endpoints
- [ ] Proper error responses for unauthorized and not found cases

## Testing Requirements

**BDD scenarios:**
- [TC-WORKFLOW-001](../spec/test-verification.md#tc-workflow-001) - Create workflow with two nodes
- [TC-WORKFLOW-003](../spec/test-verification.md#tc-workflow-003) - Versioning

**Integration tests:**
- Test workflow CRUD operations
- Test version creation on update
- Test authorization (user can only access their own workflows)

## Dependencies

- **Blocked by:** Task 1.1 (Database schema), Task 1.2 (NextAuth), Task 1.4 (next-rest-framework)
- **Blocks:** Task 2.2 (Workflow editor UI), Task 3.1 (Workflow execution)

## Effort Estimate

- **Complexity:** Medium
- **Effort:** 1.5d
