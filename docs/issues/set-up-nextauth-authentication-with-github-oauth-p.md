---
id: set-up-nextauth-authentication-with-github-oauth-p
title: Set up authentication with GitHub OAuth using better-auth
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
state: closed
createdAt: '2026-03-14T16:54:41.937Z'
priority: must
effort: 1d
dependencies:
  - task-1.1-database-schema
---

## Context

Users must authenticate via GitHub OAuth to access the dashboard. This is a core requirement for the MVP. The project uses **better-auth** instead of NextAuth for authentication.

**Related Plan Section:**
- [Task 1.2: Set up NextAuth with GitHub provider](../spec/impl-plan.md#task-12-set-up-nextauth-with-github-provider-async-updates) (adapted for better-auth)

**Related Requirements:**
- [REQ-FUNC-001](../spec/srs.md#req-func-001) - GitHub OAuth
- [REQ-FUNC-002](../spec/srs.md#req-func-002) - Profile Storage
- [NFR-SEC-001](../spec/srs.md#nfr-sec-001) - TLS
- [NFR-SEC-002](../spec/srs.md#nfr-sec-002) - Token Encryption

**Related Architecture:**
- [ADR-001: Use Next.js with API Routes](../spec/archi.md#adr-001-use-nextjs-with-api-routes)

**Related Tests:**
- [TC-AUTH-001](../spec/test-verification.md#tc-auth-001) - New user sign-in via GitHub

## Implementation Status (Completed)

Authentication with better-auth has been fully implemented:

- `lib/auth/server.ts` configures better-auth with GitHub provider, Drizzle adapter, and JWT strategy.
- `lib/auth/client.ts` creates the auth client for client-side use.
- `app/api/auth/[...auth]/route.ts` exposes the auth handler.
- `app/(auth)/login/page.tsx` uses client-side `signIn` from better-auth.
- `app/(auth)/callback/route.ts` redirects to dashboard.
- `app/layout.tsx` wraps the app with `AuthProvider`.
- `proxy.ts` (middleware) protects dashboard routes.
- Session includes GitHub access token (stored in the `accounts` table).

All acceptance criteria have been met. Authentication is ready for use.

## Closing Note

This task is complete. No further work required.
