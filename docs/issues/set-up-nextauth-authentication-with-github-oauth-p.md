---
id: set-up-nextauth-authentication-with-github-oauth-p
title: Set up NextAuth authentication with GitHub OAuth provider
labels:
  - backend
  - security
  - must
  - feature
  - 'size:medium'
assignees:
  - elcoosp
references:
  - >-
    ../spec/impl-plan.md#task-12-set-up-nextauth-with-github-provider-async-updates
  - ../spec/srs.md#req-func-001
state: open
createdAt: '2026-03-14T16:54:41.937Z'
priority: must
effort: 1d
dependencies:
  - task-1.1-database-schema
---
## Context

Users must authenticate via GitHub OAuth to access the dashboard. This is a core requirement for the MVP. NextAuth.js v5 (beta) will be used with JWT strategy to include the access token for GitHub API calls.

**Related Plan Section:**
- [Task 1.2: Set up NextAuth with GitHub provider](../spec/impl-plan.md#task-12-set-up-nextauth-with-github-provider-async-updates)

**Related Requirements:**
- [REQ-FUNC-001](../spec/srs.md#req-func-001) - GitHub OAuth
- [REQ-FUNC-002](../spec/srs.md#req-func-002) - Profile Storage
- [NFR-SEC-001](../spec/srs.md#nfr-sec-001) - TLS
- [NFR-SEC-002](../spec/srs.md#nfr-sec-002) - Token Encryption

**Related Architecture:**
- [ADR-001: Use Next.js with API Routes](../spec/archi.md#adr-001-use-nextjs-with-api-routes)

**Related Tests:**
- [TC-AUTH-001](../spec/test-verification.md#tc-auth-001) - New user sign-in via GitHub

## Problem Statement

We need to implement GitHub OAuth authentication using NextAuth.js v5, storing user profiles and access tokens securely. The session must include the GitHub access token for subsequent API calls to list repositories and create PRs.

## Solution Approach

### Implementation Details

**Files to create/modify:**
- `lib/auth.ts` — NextAuth configuration with Drizzle adapter and JWT callbacks
- `app/api/auth/[...nextauth]/route.ts` — API route handler
- `app/(auth)/login/page.tsx` — Login page with GitHub sign-in button
- `app/(auth)/callback/route.ts` — OAuth callback redirect
- `app/layout.tsx` — Add SessionProvider wrapper

**Key interfaces:**
- `auth()` function — Server-side session getter
- `signIn()` function — Server action for sign-in
- Session type extension — Add accessToken to session

## Acceptance Criteria

- [ ] NextAuth v5 and dependencies installed
- [ ] GitHub OAuth provider configured with repo scope
- [ ] Drizzle adapter connected to users/accounts/sessions tables
- [ ] JWT strategy used with access token in token
- [ ] Session includes accessToken for GitHub API calls
- [ ] Login page renders with GitHub sign-in button
- [ ] OAuth flow redirects correctly to GitHub and back
- [ ] Session provider wraps root layout
- [ ] TypeScript types extended for session.accessToken

## Testing Requirements

**BDD scenarios:**
- [TC-AUTH-001](../spec/test-verification.md#tc-auth-001) - New user sign-in via GitHub
- [TC-AUTH-002](../spec/test-verification.md#tc-auth-002) - Returning user sign-in

**Integration tests:**
- Test OAuth flow with mocked GitHub provider
- Verify session contains accessToken

## Dependencies

- **Blocked by:** Task 1.1 (Database schema)
- **Blocks:** Task 1.3 (User profile display), Task 1.5 (GitHub repo listing)

## Effort Estimate

- **Complexity:** Medium
- **Effort:** 1d
