---
id: create-dashboard-layout-with-header-sidebar-and-us
title: 'Dashboard layout and user profile display (dynamic usage counters)'
labels:
  - frontend
  - must
  - feature
  - 'size:small'
assignees:
  - elcoosp
references:
  - ../spec/impl-plan.md#task-13-display-user-profile-and-usage-async-session
  - ../spec/ux.md#51-dashboard-home
state: open
createdAt: '2026-03-14T16:54:41.939Z'
priority: must
effort: 0.5d
dependencies:
  - task-1.2-better-auth-github
---

## Context

The dashboard layout with sidebar and header has been implemented. The header currently shows a hardcoded usage count (0/10 runs). To complete this task, we need to fetch the actual `usageMonth` and `sandboxUsed` from the database and display them in the header.

**Related Plan Section:**
- [Task 1.3: Display user profile and usage (async session)](../spec/impl-plan.md#task-13-display-user-profile-and-usage-async-session)

**Related Requirements:**
- [REQ-FUNC-002](../spec/srs.md#req-func-002) - Profile Storage
- [NFR-UI-002](../spec/srs.md#nfr-ui-002) - Mobile Responsive

**Related UX:**
- [Dashboard Home](../spec/ux.md#51-dashboard-home) - Layout structure

## Current State (Already Done)
- shadcn/ui initialized with Avatar and Badge components.
- Dashboard layout (`app/(dashboard)/layout.tsx`) renders sidebar and header.
- Sidebar (`components/dashboard/sidebar.tsx`) contains navigation links.
- Header (`components/dashboard/header.tsx`) displays user avatar and a badge with hardcoded usage.
- Loading UI (`app/(dashboard)/loading.tsx`) exists.

## Remaining Work

We need to fetch the real `usageMonth` and `sandboxUsed` from the `users` table and display them in the header. The values are stored in the database but not yet included in the session. Two options:

1. Extend the better-auth session via a custom callback to include these fields.
2. Query the database directly in the `Header` component (server component) using the user ID from the session.

We'll implement option 2 for simplicity.

## Solution Approach

**Files to modify:**
- `components/dashboard/header.tsx` — Add database query to fetch user's usage counters.

**Steps:**
- In `header.tsx`, after obtaining the session, use `db` to select `usageMonth` and `sandboxUsed` from the `users` table where `id` equals `session.user.id`.
- Update the badge to display the fetched values.

## Acceptance Criteria

- [ ] `Header` component fetches `usageMonth` and `sandboxUsed` from the database.
- [ ] Badge shows the actual run count (e.g., "Free Plan · 3/10 runs").
- [ ] Sandbox usage not displayed in header (but could be added later if needed).
- [ ] No hardcoded values remain.

## Testing Requirements

**Manual test:**
- Sign in and verify that the badge shows the correct usage count after running workflows.

## Dependencies

- **Blocked by:** Task 1.2 (better-auth)
- **Blocks:** None (this is the final part of an already mostly completed task)

## Effort Estimate

- **Complexity:** Low
- **Effort:** 0.5d
