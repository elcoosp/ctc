---
id: build-run-details-ui-with-polling-and-status-displ
title: Build run details UI with polling and status display
labels:
  - frontend
  - must
  - feature
  - 'size:medium'
assignees:
  - elcoosp
references:
  - ../spec/impl-plan.md#task-32-build-run-details-ui-and-polling
  - ../spec/ux.md#54-run-details
  - ../spec/srs.md#req-func-020
state: open
createdAt: '2026-03-14T16:55:51.444Z'
priority: must
effort: 1d
dependencies:
  - task-1.3-dashboard-layout
  - task-3.1-workflow-execution-engine
---
## Context

Users need to view their workflow runs with real-time status updates. The UI should poll for run status, display node results, and show completion/failure states. This provides visibility into the workflow execution process.

**Related Plan Section:**
- [Task 3.2: Build run details UI and polling](../spec/impl-plan.md#task-32-build-run-details-ui-and-polling)

**Related Requirements:**
- [REQ-FUNC-020](../spec/srs.md#req-func-020) - Track Generations
- [NFR-UI-001](../spec/srs.md#nfr-ui-001) - First-time UX

**Related UX:**
- [Run Details](../spec/ux.md#54-run-details) - Node list, status, publish section
- [Run Execution Feedback](../spec/ux.md#62-run-execution-feedback) - Progress bar, node highlighting

**Related Tests:**
- [TC-RUN-008](../spec/test-verification.md#tc-run-008) - Node failure stops run

## Problem Statement

We need to create a runs list page and a run details page that polls for status updates, displays node results in expandable cards, and shows run metadata. The UI should handle pending, running, completed, and failed states.

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `app/(dashboard)/runs/page.tsx` — Runs list page (server component)
- `app/(dashboard)/runs/loading.tsx` — Loading UI for runs
- `app/(dashboard)/runs/error.tsx` — Error boundary for runs
- `app/(dashboard)/runs/[id]/page.tsx` — Run details page (client component with polling)
- `app/api/v1/runs/[id]/route.ts` — GET endpoint for single run
- `components/runs/run-status-badge.tsx` — Status badge component
- `components/runs/node-results.tsx` — Node results display component

**Key interfaces:**
- `RunsPage` — Server component listing user's runs
- `RunDetailsPage` — Client component with polling (2s interval)
- `RunStatusBadge` — Badge with status-specific styling
- `NodeResults` — Expandable cards for each node's output
- `GET /api/v1/runs/:id` — Returns run with nodeResults

## Acceptance Criteria

- [ ] Runs list page shows all runs with status badges
- [ ] Each run card shows workflow name, status, start time
- [ ] Clicking run navigates to details page
- [ ] Run details page polls every 2 seconds while status is pending/running
- [ ] Polling stops when status is completed or failed
- [ ] Run status badge shows: pending (secondary), running (default), completed (outline), failed (destructive)
- [ ] Node results displayed in expandable cards
- [ ] Each node card shows: node ID, status, output/error
- [ ] Output displayed as formatted JSON
- [ ] Error messages shown in red/destructive styling
- [ ] Run metadata displayed: workflow ID, start time, completion time
- [ ] Loading.tsx shows loading state
- [ ] Error.tsx handles errors with retry
- [ ] All components use shadcn/ui (Card, Badge)

## Testing Requirements

**Visual tests:**
- Verify runs list renders correctly
- Verify run details page shows all information
- Test polling behavior

**E2E tests:**
- User can view runs list
- User can view run details
- Status updates correctly when run completes

## Dependencies

- **Blocked by:** Task 1.3 (Dashboard layout), Task 3.1 (Workflow execution engine)
- **Blocks:** Task 4.1 (GitHub PR connector - publish buttons)

## Effort Estimate

- **Complexity:** Medium
- **Effort:** 1d
