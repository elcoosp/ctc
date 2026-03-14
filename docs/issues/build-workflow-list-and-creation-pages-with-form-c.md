---
id: build-workflow-list-and-creation-pages-with-form-c
title: Build workflow list and creation pages with form components
labels:
  - frontend
  - must
  - feature
  - 'size:medium'
assignees:
  - elcoosp
references:
  - ../spec/impl-plan.md#task-22-build-simple-workflow-editor-ui
  - ../spec/ux.md#52-workflows-list
  - ../spec/ux.md#53-workflow-editor
state: open
createdAt: '2026-03-14T16:55:10.957Z'
priority: must
effort: 1.5d
dependencies:
  - task-1.3-dashboard-layout
  - task-1.5-github-repo-listing
  - task-2.1-workflow-crud-api
---

## Context

Users need a visual interface to create and manage workflows. This includes a list view of all workflows, a page to create new workflows, and an edit page for existing workflows. The UI should follow shadcn/ui best practices.

**Related Plan Section:**
- [Task 2.2: Build simple workflow editor UI](../spec/impl-plan.md#task-22-build-simple-workflow-editor-ui)

**Related Requirements:**
- [REQ-FUNC-003](../spec/srs.md#req-func-003) - Workflow CRUD
- [REQ-FUNC-004](../spec/srs.md#req-func-004) - Visual Workflow Editor
- [NFR-UI-001](../spec/srs.md#nfr-ui-001) - First-time UX

**Related UX:**
- [Workflows List](../spec/ux.md#52-workflows-list) - Table design
- [Workflow Editor](../spec/ux.md#53-workflow-editor) - Canvas and node palette

## Problem Statement

We need to create the workflow management UI with a list page, a new workflow page with a form to select repository and add agents, and an edit page. For MVP, the workflow editor will be simplified (sequential nodes without visual canvas).

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `app/(dashboard)/workflows/page.tsx` — Workflows list (server component)
- `app/(dashboard)/workflows/loading.tsx` — Loading UI
- `app/(dashboard)/workflows/error.tsx` — Error boundary
- `app/(dashboard)/workflows/new/page.tsx` — New workflow page (client component)
- `app/(dashboard)/workflows/[id]/page.tsx` — Edit workflow page (server + client)
- `components/workflows/workflow-form.tsx` — Workflow form component
- `components/workflows/node-list.tsx` — Node list display component

**Key interfaces:**
- `WorkflowsPage` — Server component fetching user's workflows
- `WorkflowForm` — Client component with repo selector and agent buttons
- `NodeList` — Displays added nodes in sequence
- Loading and error boundaries for proper UX

## Acceptance Criteria

- [ ] Workflows list page shows all user workflows
- [ ] Empty state shows when no workflows exist
- [ ] "New Workflow" button navigates to creation page
- [ ] New workflow page has name input and workflow form
- [ ] Workflow form includes `RepoSelector` component (already built)
- [ ] Workflow form shows available agents as buttons (agents from registry)
- [ ] Clicking agent button adds node to list
- [ ] Nodes display in sequential order
- [ ] Edit page fetches existing workflow and pre-populates form
- [ ] `loading.tsx` shows skeleton or loading message
- [ ] `error.tsx` handles errors with retry option
- [ ] All components use shadcn/ui (Card, Button, Input, Label, Select)
- [ ] Form layouts follow shadcn best practices (use `Field`, `FieldGroup` if needed)

## Testing Requirements

**Visual tests:**
- Verify workflows list renders correctly
- Test empty state display
- Verify form submission creates workflow

**E2E tests:**
- User can create a new workflow
- User can view existing workflows
- User can edit a workflow

## Dependencies

- **Blocked by:** Task 1.3 (Dashboard layout), Task 1.5 (RepoSelector), Task 2.1 (Workflow API)
- **Blocks:** Task 3.2 (Run details UI)

## Effort Estimate

- **Complexity:** Medium
- **Effort:** 1.5d
