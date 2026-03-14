---
id: create-dashboard-layout-with-header-sidebar-and-us
title: 'Create dashboard layout with header, sidebar, and user profile display'
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
  - task-1.2-nextauth-github
---
## Context

After authentication, users need a dashboard layout that displays their profile information and provides navigation to different sections. This establishes the main UI shell for the application.

**Related Plan Section:**
- [Task 1.3: Display user profile and usage](../spec/impl-plan.md#task-13-display-user-profile-and-usage-async-session)

**Related Requirements:**
- [REQ-FUNC-002](../spec/srs.md#req-func-002) - Profile Storage
- [NFR-UI-002](../spec/srs.md#nfr-ui-002) - Mobile Responsive

**Related UX:**
- [Dashboard Home](../spec/ux.md#51-dashboard-home) - Layout structure
- [Navigation](../spec/ux.md#42-navigation) - Sidebar design

## Problem Statement

We need to create the dashboard layout with a sidebar for navigation, a header showing user profile and usage stats, and proper loading states. The layout must follow shadcn/ui best practices and use server components where possible.

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `app/(dashboard)/layout.tsx` — Dashboard layout with sidebar and header
- `components/dashboard/header.tsx` — Header component with user avatar and usage badge
- `components/dashboard/sidebar.tsx` — Navigation sidebar with links
- `app/(dashboard)/loading.tsx` — Loading UI for dashboard segment

**Key interfaces:**
- `Header` — Server component that awaits auth session
- `Sidebar` — Server component with navigation links
- Usage badge — Shows plan and run count (hardcoded initially)

## Acceptance Criteria

- [ ] shadcn/ui initialized with default configuration
- [ ] Avatar and Badge components installed
- [ ] Dashboard layout renders with sidebar and header
- [ ] Header displays user avatar with fallback initials
- [ ] Header shows plan badge (Free Plan · 0/10 runs)
- [ ] Sidebar contains navigation links: Home, Workflows, Runs, Agents, Connectors, Settings
- [ ] All navigation uses proper Next.js Link components
- [ ] Loading UI displays while dashboard segment loads
- [ ] Components follow shadcn/ui best practices (size-* for equal dimensions, gap-* for spacing)

## Testing Requirements

**Visual tests:**
- Verify layout renders correctly on desktop and tablet
- Check that all navigation links are accessible

## Dependencies

- **Blocked by:** Task 1.2 (NextAuth setup)
- **Blocks:** Task 2.2 (Workflow editor UI), Task 3.2 (Run details UI)

## Effort Estimate

- **Complexity:** Low
- **Effort:** 0.5d
