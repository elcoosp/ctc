# AI Content Agent Dashboard Implementation Plan (Updated for Actual Codebase)

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build MVP of AI Content Agent Dashboard enabling solo developers to create and run workflows with two agents (research-writer, copywriting) and publish results as GitHub PRs.

**Architecture:** Next.js App Router with next-rest-framework for type-safe APIs; Drizzle ORM on SQLite (Turso in production); Background worker via Vercel cron; Ollama for LLM (or mock); shadcn/ui + Tailwind for frontend.

**Tech Stack (actual):** TypeScript, Next.js 16.1.6, React 19.2.3, Drizzle ORM 1.0.0-beta, better-sqlite3, better-auth 1.5.5, next-rest-framework 5.1.12 (to be added), Zod 4 (to be added), Vitest (to be added), Playwright (to be added), Biome 2.2.0, radix-ui 1.4.3, Lucide React 0.577.0, Tailwind CSS 4, Vercel, Node.js 20+.

**Next.js Best Practices Followed:**
- **Server Components by default** – only add `'use client'` where interactivity is needed.
- **Data fetching** in Server Components with proper caching strategies (`fetch` with `next: { revalidate }`, or `no-store` for dynamic data).
- **Loading UI** with `loading.tsx` files and Suspense boundaries.
- **Error handling** with `error.tsx` and `not-found.tsx` for each route segment.
- **Metadata** exported from pages/layouts using `Metadata` type.
- **Server Actions** for mutations, with progressive enhancement.
- **Route Handlers** (`route.ts`) for API endpoints, with proper input validation.
- **Parallel routes** and **intercepting routes** are not needed for MVP, but patterns are documented for future.
- **`generateStaticParams`** used for dynamic routes that can be pre‑rendered (e.g., workflow runs? not needed yet).

**shadcn/ui Best Practices (enforced throughout plan):**
- Use `FieldGroup` + `Field` for form layouts, never `div` with `space-y-*`.
- Use `InputGroup`, `InputGroupInput`, `InputGroupAddon` for buttons inside inputs.
- Use `ToggleGroup` for option sets (2–7 choices), not manual buttons with active state.
- Use `FieldSet` + `FieldLegend` for grouping related fields.
- Validation: `data-invalid` on `Field`, `aria-invalid` on the control.
- Disabled: `data-disabled` on `Field`, `disabled` on the control.
- Icons in buttons use `data-icon="inline-start"` or `data-icon="inline-end"`, never sizing classes.
- Use semantic color tokens (`bg-primary`, `text-muted-foreground`) – never raw colors.
- Use `gap-*` for spacing, not `space-y-*` or `space-x-*`.
- Use `size-*` when width and height are equal (e.g., `size-10`).
- Use `cn()` utility for conditional classes.
- Always include `AvatarFallback` with `Avatar`.
- Use full `Card` composition (`CardHeader`, `CardTitle`, `CardContent`, `CardFooter`).
- Use `Skeleton` for loading placeholders.
- Use `Badge` for status indicators.
- Check `base` vs `radix` from `components.json` to apply correct props (`asChild` vs `render`, etc.).
- Before adding components, run `npx shadcn@latest info` to get project config and installed components.
- After adding third‑party components, verify imports and fix hardcoded paths.

---

## Chunk 1: Sprint 1 – Foundation

### Task 1.1: Set up database schema and migrations ✅ (Completed)

**Files:**
- `db/schema.ts` ✅
- `db/client.ts` ✅
- `db/migrations/` ✅
- `package.json` (scripts added) ✅
- `.env.example` ✅

**Actual state:**  
- Schema defined using Drizzle ORM with tables for `users`, `accounts`, `sessions`, `verifications`, `workflows`, `workflowVersions`, `runs`, `connectors`.  
- `db/client.ts` uses `better-sqlite3` driver (local SQLite).  
- Migration `20260314181531_noisy_captain_flint` exists.  
- `.env.example` includes `DB_FILE_NAME`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `OLLAMA_BASE_URL`, `ENCRYPTION_KEY`, `CRON_SECRET`.  

**No further action required.**

---

### Task 1.2: Set up authentication with GitHub provider ✅ (Completed, using better-auth)

**Files:**
- `lib/auth/server.ts` ✅
- `lib/auth/client.ts` ✅
- `app/api/auth/[...auth]/route.ts` ✅
- `app/(auth)/login/page.tsx` ✅
- `app/(auth)/callback/route.ts` ✅
- `app/layout.tsx` (with `AuthProvider`) ✅
- `components/auth-provider.tsx` ✅

**Actual state:**  
- Authentication implemented with **better-auth**, not NextAuth.  
- GitHub provider configured with `repo` scope.  
- Session available via `auth.api.getSession` and `AuthProvider`.  
- Login page uses server action with `signIn.social`.  

**No further action required.**

---

### Task 1.3: Display user profile and usage (async session) ✅ (Partial – usage counters not yet dynamic)

**Files:**
- `app/(dashboard)/layout.tsx` ✅
- `components/dashboard/header.tsx` ✅
- `components/dashboard/sidebar.tsx` ✅
- `app/(dashboard)/loading.tsx` ✅
- UI components: `avatar`, `badge`, `button`, `card`, `input`, `label` (shadcn) ✅

**Actual state:**  
- Dashboard layout, header, sidebar, and loading UI exist.  
- Header shows user avatar and hardcoded usage (0/10).  
- Usage counters are stored in the `users` table but not yet fetched dynamically.  

**Remaining steps:**  
- [ ] In `header.tsx`, fetch `usageMonth` and `sandboxUsed` from the database or add them to the session object.  
  - Option 1: Extend the session via better-auth callbacks (see [better-auth docs](https://better-auth.com/docs/callbacks)).  
  - Option 2: Query the database directly in the component (server component) using the user ID from the session.

---

### Task 1.4: Set up next-rest-framework and OpenAPI generation ⏳ (Not started)

**Files to create:**
- `app/api/v1/docs/route.ts`
- `.github/workflows/ci.yml` (add OpenAPI validation)
- Modify `package.json` (add scripts)

- [ ] **Step 1: Install next-rest-framework**

```bash
pnpm add next-rest-framework@5.1.12
pnpm add -D tsx@4.19.3
```

- [ ] **Step 2: Create docs endpoint `app/api/v1/docs/route.ts`**

```typescript
import { docsRoute } from 'next-rest-framework';

export const { GET } = docsRoute({
  openApiObject: {
    info: {
      title: 'AI Content Agent API',
      version: '1.0.0',
    },
  },
  docsConfig: {
    provider: 'redoc',
    title: 'API Documentation',
  },
});
```

- [ ] **Step 3: Add generate and validate scripts to `package.json`**

```json
{
  "scripts": {
    "generate:openapi": "NODE_OPTIONS='--import=tsx' next-rest-framework generate",
    "validate:openapi": "NODE_OPTIONS='--import=tsx' next-rest-framework validate"
  }
}
```

- [ ] **Step 4: Test generation**

Run: `pnpm generate:openapi`  
Expected: `public/openapi.json` created.

- [ ] **Step 5: Add validation step to CI workflow** (create `.github/workflows/ci.yml` if not exists)

```yaml
name: CI
on: [push, pull_request]
jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint:ci
      - run: pnpm test:ci
      - run: pnpm validate:openapi
```

- [ ] **Step 6: Commit**

```bash
git add package.json app/api/v1/docs/route.ts .github/workflows/ci.yml
git commit -m "ci: add next-rest-framework and OpenAPI generation"
```

---

### Task 1.5: Implement GitHub API client to list repositories (with async session) ⏳ (Not started)

**Files to create:**
- `lib/github.ts`
- `app/api/v1/github/repos/route.ts`
- `components/repo-selector.tsx`

**Note:** With better-auth, the access token is stored in the `accounts` table. We need to retrieve it using the user ID from the session.

- [ ] **Step 1: Write GitHub client in `lib/github.ts`**

```typescript
import { headers } from 'next/headers';
import { auth } from '@/lib/auth/server';
import { db } from '@/db/client';
import { accounts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function fetchUserRepos() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error('Not authenticated');

  // Retrieve access token from accounts table
  const userAccount = await db.select().from(accounts)
    .where(eq(accounts.userId, session.user.id))
    .get();
  const accessToken = userAccount?.accessToken;
  if (!accessToken) throw new Error('No access token');

  const response = await fetch('https://api.github.com/user/repos?per_page=100&sort=updated', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch repos');
  return response.json();
}
```

- [ ] **Step 2: Create API route `app/api/v1/github/repos/route.ts`** using next-rest-framework.

```typescript
import { route, routeOperation } from 'next-rest-framework';
import { fetchUserRepos } from '@/lib/github';
import * as z from 'zod';

const repoShape = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  private: z.boolean(),
  html_url: z.string(),
});

export const { GET } = route({
  getRepos: routeOperation({ method: 'GET' })
    .outputs([
      {
        status: 200,
        contentType: 'application/json',
        body: z.array(repoShape),
      },
    ])
    .handler(async () => {
      try {
        const repos = await fetchUserRepos();
        return Response.json(repos);
      } catch (error) {
        return Response.json({ error: (error as Error).message }, { status: 500 });
      }
    }),
});
```

- [ ] **Step 3: Create `components/repo-selector.tsx`** – client component, uses state and fetch.

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Repo {
  id: number;
  name: string;
  full_name: string;
}

export function RepoSelector({ onSelect }: { onSelect: (repo: string) => void }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/github/repos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setError(data.error || 'Failed to load repos');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading repos...</div>;
  if (error) return <div className="text-destructive">Error: {error}</div>;

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select a repository" />
      </SelectTrigger>
      <SelectContent>
        {repos.map(repo => (
          <SelectItem key={repo.id} value={repo.full_name}>
            {repo.full_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

- [ ] **Step 4: Install shadcn/ui select** (if not already)

```bash
pnpm dlx shadcn@latest add select
```

- [ ] **Step 5: Commit**

```bash
git add lib/github.ts app/api/v1/github/repos/route.ts components/repo-selector.tsx
git commit -m "feat: add GitHub repo listing"
```

---

### Task 1.6: Define agent registry with mock LLM (Zod 4 updates) ⏳ (Not started)

**Files to create:**
- `agents/types.ts`
- `agents/mock-llm.ts`
- `services/llm/adapter.ts`
- `agents/registry.ts`
- `agents/registry.test.ts`

- [ ] **Step 1: Install Zod 4**

```bash
pnpm add zod@4
```

- [ ] **Step 2: Define agent types in `agents/types.ts`** (Zod 4 import)

```typescript
import * as z from 'zod';

export interface Agent {
  name: string;
  description: string;
  inputSchema: z.ZodObject<any>;
  outputSchema: z.ZodObject<any>;
  execute: (input: any, context: { codeContext: string }) => Promise<any>;
}
```

- [ ] **Step 3: Create mock LLM in `agents/mock-llm.ts`**

```typescript
export async function mockLLM(prompt: string): Promise<string> {
  console.log('Mock LLM called with prompt:', prompt);
  return JSON.stringify({
    summary: 'This is a mock summary of the code changes.',
    citations: ['Mock Source 1', 'Mock Source 2'],
  });
}
```

- [ ] **Step 4: Create `services/llm/adapter.ts`**

```typescript
import { mockLLM } from '@/agents/mock-llm';

export interface LLMAdapter {
  generateContent(params: {
    codeContext: string;
    prompt?: string;
    agentType: string;
  }): Promise<string>;
}

export class MockLLMAdapter implements LLMAdapter {
  async generateContent(params: { codeContext: string; prompt?: string; agentType: string }): Promise<string> {
    if (params.agentType === 'research-writer') {
      return JSON.stringify({
        summary: 'Mock research summary',
        citations: ['Mock citation 1', 'Mock citation 2'],
      });
    } else if (params.agentType === 'copywriting') {
      return JSON.stringify({
        draft: 'Mock blog post draft about the code changes.',
      });
    }
    return mockLLM(params.prompt || '');
  }
}
```

- [ ] **Step 5: Create `agents/registry.ts`** – with two agents.

```typescript
import * as z from 'zod';
import { Agent } from './types';
import { MockLLMAdapter } from '@/services/llm/adapter';

const llm = new MockLLMAdapter();

export const researchWriter: Agent = {
  name: 'research-writer',
  description: 'Researches topics and adds citations',
  inputSchema: z.object({
    topic: z.string(),
  }),
  outputSchema: z.object({
    summary: z.string(),
    citations: z.array(z.string()),
  }),
  execute: async (input, { codeContext }) => {
    const prompt = `Research the topic "${input.topic}" using this code context:\n${codeContext}\nProvide JSON with fields: summary (string), citations (array of strings).`;
    const result = await llm.generateContent({ codeContext, prompt, agentType: 'research-writer' });
    return JSON.parse(result);
  },
};

export const copywriting: Agent = {
  name: 'copywriting',
  description: 'Writes marketing copy from research',
  inputSchema: z.object({
    research: z.string(),
  }),
  outputSchema: z.object({
    draft: z.string(),
  }),
  execute: async (input, { codeContext }) => {
    const prompt = `Based on this research:\n${input.research}\nWrite a compelling blog post draft using code context:\n${codeContext}\nReturn JSON with field: draft (string).`;
    const result = await llm.generateContent({ codeContext, prompt, agentType: 'copywriting' });
    return JSON.parse(result);
  },
};

export const agents = {
  'research-writer': researchWriter,
  'copywriting': copywriting,
};

export function getAgent(name: string): Agent | undefined {
  return agents[name as keyof typeof agents];
}
```

- [ ] **Step 6: Install Vitest and related packages** (if not already)

```bash
pnpm add -D vitest@^4.1.0-beta.3 jsdom @vitest/ui
```

- [ ] **Step 7: Create `agents/registry.test.ts`** – unit tests.

```typescript
import { describe, it, expect } from 'vitest';
import { researchWriter, copywriting } from './registry';

describe('agents', () => {
  it('researchWriter output schema validates', () => {
    const validOutput = { summary: 'test', citations: ['a'] };
    expect(() => researchWriter.outputSchema.parse(validOutput)).not.toThrow();
  });

  it('copywriting output schema validates', () => {
    const validOutput = { draft: 'test draft' };
    expect(() => copywriting.outputSchema.parse(validOutput)).not.toThrow();
  });
});
```

- [ ] **Step 8: Run tests to verify**

```bash
pnpm test agents/registry.test.ts
Expected: All tests pass.
```

- [ ] **Step 9: Commit**

```bash
git add agents/ services/llm/
git commit -m "feat: add agent registry with mock LLM"
```

---

## Chunk 2: Sprint 2 – Workflow Creation

### Task 2.1: Create workflow model and API (async updates) ⏳ (Not started)

**Files to create:**
- `lib/workflow-engine/types.ts`
- `app/api/v1/workflows/route.ts`
- `app/api/v1/workflows/[id]/route.ts`
- `app/api/v1/workflows/[id]/versions/route.ts`

**Note:** Use better-auth for session handling; access token retrieval for GitHub operations will be done later in the executor.

- [ ] **Step 1: Define workflow types in `lib/workflow-engine/types.ts`**

```typescript
import * as z from 'zod';

export const nodeInputSourceSchema = z.discriminatedUnion('source', [
  z.object({ source: z.literal('constant'), value: z.any() }),
  z.object({ source: z.literal('node'), nodeId: z.string(), outputKey: z.string() }),
]);

export const nodeSchema = z.object({
  id: z.string(),
  agent: z.string(),
  inputs: z.record(z.string(), nodeInputSourceSchema),
});

export const workflowDefinitionSchema = z.object({
  name: z.string(),
  nodes: z.array(nodeSchema),
  edges: z.array(z.object({ from: z.string(), to: z.string() })),
  outputConnectors: z.array(z.object({
    connector: z.string(),
    config: z.record(z.any()),
    artifactSelector: z.string(),
  })).optional(),
});

export type WorkflowDefinition = z.infer<typeof workflowDefinitionSchema>;
```

- [ ] **Step 2: Create POST / GET endpoints `app/api/v1/workflows/route.ts`**

```typescript
import { route, routeOperation } from 'next-rest-framework';
import * as z from 'zod';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth/server';
import { db } from '@/db/client';
import { workflows, workflowVersions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { workflowDefinitionSchema } from '@/lib/workflow-engine/types';

export const { POST, GET } = route({
  createWorkflow: routeOperation({ method: 'POST' })
    .input({
      contentType: 'application/json',
      body: z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        definition: workflowDefinitionSchema,
      }),
    })
    .outputs([
      { status: 201, contentType: 'application/json', body: z.object({ id: z.string() }) },
      { status: 401, contentType: 'application/json', body: z.object({ error: z.string() }) },
    ])
    .handler(async (req) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

      const { name, definition } = await req.json();
      const workflowId = crypto.randomUUID();
      await db.insert(workflows).values({
        id: workflowId,
        userId: session.user.id,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await db.insert(workflowVersions).values({
        id: crypto.randomUUID(),
        workflowId,
        version: 1,
        definition,
        createdAt: new Date(),
      });

      return Response.json({ id: workflowId }, { status: 201 });
    }),

  listWorkflows: routeOperation({ method: 'GET' })
    .outputs([
      { status: 200, contentType: 'application/json', body: z.array(z.any()) },
    ])
    .handler(async () => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

      const list = await db.select().from(workflows).where(eq(workflows.userId, session.user.id));
      return Response.json(list);
    }),
});
```

- [ ] **Step 3: Create `app/api/v1/workflows/[id]/route.ts`** – GET, PUT, DELETE (similar, with ownership checks)

- [ ] **Step 4: Create `app/api/v1/workflows/[id]/versions/route.ts`** – GET versions.

- [ ] **Step 5: Test endpoints using curl or Thunder Client**

- [ ] **Step 6: Commit**

---

### Task 2.2: Build simple workflow editor UI ⏳ (Not started)

**Files to create:**
- `app/(dashboard)/workflows/page.tsx`
- `app/(dashboard)/workflows/loading.tsx`
- `app/(dashboard)/workflows/error.tsx`
- `app/(dashboard)/workflows/new/page.tsx`
- `app/(dashboard)/workflows/[id]/page.tsx`
- `components/workflows/workflow-form.tsx`
- `components/workflows/node-list.tsx`

**Note:** The original plan references `FieldGroup`, `Field`, and `FieldLabel`. These are not part of the default shadcn/ui registry. You may create them as simple wrappers or use standard `Label` and `Input` with `div` spacing, but adhering to best practices we'll create a `Field` component. Optionally, use `shadcn/ui` form components (which are built on `react-hook-form`). For MVP, simple controlled components are sufficient.

- [ ] **Step 1: (Optional) Create `components/ui/field.tsx`**

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
  disabled?: boolean;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, invalid, disabled, ...props }, ref) => (
    <div
      ref={ref}
      data-invalid={invalid ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      className={cn('flex flex-col gap-1.5', className)}
      {...props}
    />
  )
);
Field.displayName = 'Field';

const FieldLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
      {...props}
    />
  )
);
FieldLabel.displayName = 'FieldLabel';

const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-4', className)} {...props} />
  )
);
FieldGroup.displayName = 'FieldGroup';

export { Field, FieldLabel, FieldGroup };
```

- [ ] **Step 2: Create workflows list page `app/(dashboard)/workflows/page.tsx`** – server component, similar to original but using `auth` from `@/lib/auth/server`.

- [ ] **Step 3: Create loading and error files** as in original.

- [ ] **Step 4: Create new workflow page `app/(dashboard)/workflows/new/page.tsx`** – client component with form.

- [ ] **Step 5: Create `components/workflows/workflow-form.tsx`** – as in original, using `RepoSelector` and the new field components.

- [ ] **Step 6: Create edit page `app/(dashboard)/workflows/[id]/page.tsx`** – fetch workflow and latest version, then pass to form.

- [ ] **Step 7: Commit**

---

## Chunk 3: Sprint 3 – Execution & UI

### Task 3.1: Implement workflow execution engine ⏳ (Not started)

**Files to create:**
- `lib/workflow-engine/executor.ts`
- `lib/workflow-engine/code-fetcher.ts`
- `app/api/v1/workflows/[id]/run/route.ts`
- `workers/run-processor.ts`
- `app/api/cron/process-runs/route.ts`

**Note:** Access token retrieval in `code-fetcher.ts` must query the `accounts` table (similar to Task 1.5). The worker can be a simple Node.js script or a Vercel cron job.

- [ ] **Step 1: Create code fetcher `lib/workflow-engine/code-fetcher.ts`** – uses session and access token.

```typescript
import { headers } from 'next/headers';
import { auth } from '@/lib/auth/server';
import { db } from '@/db/client';
import { accounts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function fetchRepositoryCode(repoFullName: string): Promise<string> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error('Not authenticated');

  const userAccount = await db.select().from(accounts)
    .where(eq(accounts.userId, session.user.id))
    .get();
  const accessToken = userAccount?.accessToken;
  if (!accessToken) throw new Error('No access token');

  // Fetch repo tree and first few files
  const response = await fetch(`https://api.github.com/repos/${repoFullName}/git/trees/main?recursive=1`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error('Failed to fetch repo tree');

  const tree = await response.json();
  const codeFiles = tree.tree.filter((item: any) => 
    item.type === 'blob' && 
    !item.path.endsWith('.md') && 
    !item.path.endsWith('.txt')
  ).slice(0, 10);

  const contents = await Promise.all(codeFiles.map(async (file: any) => {
    const contentRes = await fetch(`https://api.github.com/repos/${repoFullName}/contents/${file.path}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const contentJson = await contentRes.json();
    return `File: ${file.path}\n${Buffer.from(contentJson.content, 'base64').toString()}`;
  }));

  return contents.join('\n\n');
}
```

- [ ] **Step 2: Create executor `lib/workflow-engine/executor.ts`** – as in original plan, using `getAgent` from registry.

- [ ] **Step 3: Create run endpoint `app/api/v1/workflows/[id]/run/route.ts`** – with quota checks (same as original, but using better-auth session).

- [ ] **Step 4: Create background worker `workers/run-processor.ts`** – same logic but using the executor and updating runs and user counters.

- [ ] **Step 5: Create a Vercel cron endpoint `app/api/cron/process-runs/route.ts`** – protected by `CRON_SECRET`.

- [ ] **Step 6: Commit**

---

### Task 3.2: Build run details UI and polling ⏳ (Not started)

**Files to create:**
- `app/(dashboard)/runs/page.tsx`
- `app/(dashboard)/runs/loading.tsx`
- `app/(dashboard)/runs/[id]/page.tsx`
- `components/runs/run-status-badge.tsx`
- `components/runs/node-results.tsx`

- [ ] **Step 1: Create runs list page** – server component fetching runs for the user's workflows (join with workflows table).

- [ ] **Step 2: Create loading and error files** for the runs segment.

- [ ] **Step 3: Create run details page** – client component with polling (use `fetch` to GET `/api/v1/runs/[id]` – note: we haven't created that API endpoint yet; we'll need to add a GET route for runs. This should be added under `app/api/v1/runs/[id]/route.ts` later; for now, we can fetch from the runs table directly in the server component, but polling requires an API. We'll add the GET endpoint in the next chunk.

- [ ] **Step 4: Create presentational components** (`run-status-badge.tsx`, `node-results.tsx`) as in original.

- [ ] **Step 5: Commit**

---

## Chunk 4: Sprint 4 – Publishing & Quota

### Task 4.1: Implement GitHub PR connector ⏳ (Not started)

**Files to create:**
- `connectors/github-pr.ts`
- `app/api/v1/connectors/route.ts`
- `app/api/v1/runs/[id]/publish/route.ts`
- `components/runs/publish-buttons.tsx`

**Note:** Connector configs should be encrypted. Use the `ENCRYPTION_KEY` from env.

- [ ] **Step 1: Create connector logic `connectors/github-pr.ts`** – similar to original, but retrieve access token from `accounts` table.

- [ ] **Step 2: Create connectors API `app/api/v1/connectors/route.ts`** – CRUD for connector configs (encrypted).

- [ ] **Step 3: Create publish endpoint `app/api/v1/runs/[id]/publish/route.ts`** – calls the appropriate connector based on type.

- [ ] **Step 4: Create publish button component** – client component that calls the publish endpoint.

- [ ] **Step 5: Commit**

---

### Task 4.2: Add sandbox mode and quota enforcement ✅ (Already in run endpoint)

- The run endpoint in Task 3.1 includes sandbox checks and increments counters.

### Task 4.3: Integrate real Ollama LLM ⏳ (Not started)

**Files to create:**
- `services/llm/ollama.ts`
- Modify `agents/registry.ts` to use real LLM if `OLLAMA_BASE_URL` set.

- [ ] **Step 1: Create Ollama adapter**

```typescript
// services/llm/ollama.ts
import { LLMAdapter } from './adapter';

export class OllamaAdapter implements LLMAdapter {
  constructor(private baseUrl: string) {}
  async generateContent(params: { codeContext: string; prompt?: string; agentType: string }): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      body: JSON.stringify({
        model: this.selectModel(params.agentType),
        prompt: params.prompt,
        stream: false,
        format: 'json',
        options: { temperature: 0.7 },
      }),
    });
    if (!response.ok) throw new Error('Ollama error');
    const data = await response.json();
    return data.response;
  }
  private selectModel(agentType: string): string {
    const modelMap: Record<string, string> = {
      'research-writer': 'deepseek-r1:8b',
      'copywriting': 'llama3.2:3b',
    };
    return modelMap[agentType] || process.env.OLLAMA_DEFAULT_MODEL || 'deepseek-r1:8b';
  }
}
```

- [ ] **Step 2: Conditionally use real LLM in `agents/registry.ts`**

```typescript
import { OllamaAdapter } from '@/services/llm/ollama';
const llm = process.env.OLLAMA_BASE_URL
  ? new OllamaAdapter(process.env.OLLAMA_BASE_URL)
  : new MockLLMAdapter();
```

- [ ] **Step 3: Commit**

---

## Chunk 5: Sprint 5 – Polish & Bug Fixes

### Task 5.1: End‑to‑end testing with Playwright ⏳ (Not started)

**Files to create:**
- `e2e/auth.spec.ts`
- `e2e/workflow.spec.ts`
- Update `package.json` with test scripts.

- [ ] **Step 1: Install Playwright**

```bash
pnpm add -D @playwright/test@1.58.0
npx playwright install
```

- [ ] **Step 2: Write test using updated selectors (no React selectors)**

```typescript
import { test, expect } from '@playwright/test';

test('user can sign in', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: /sign in with github/i }).click();
  // ... we need to mock GitHub OAuth or use a test account.
  // For now, we'll just check navigation.
  await expect(page).toHaveURL(/.*dashboard/);
});
```

- [ ] **Step 3: Add test script to `package.json`**

```json
{
  "scripts": {
    "test:e2e": "playwright test"
  }
}
```

- [ ] **Step 4: Commit**

---

### Task 5.2: Final UI polish and accessibility ⏳ (Not started)

- Ensure all components have proper ARIA labels (shadcn/ui does this by default).
- Add dark mode support using `next-themes` (optional). Install `next-themes` and wrap in provider.

- [ ] **Step 1: Install `next-themes`**

```bash
pnpm add next-themes
```

- [ ] **Step 2: Create a theme provider and add to layout** (see `next-themes` docs).

---

### Task 5.3: Documentation and environment validation ⏳ (Not started)

**Files to create:**
- `lib/env.ts` – validate environment variables with Zod.

- [ ] **Step 1: Create environment validation utility `lib/env.ts`**

```typescript
import * as z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(), // for Turso later
  DB_FILE_NAME: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),
  OLLAMA_BASE_URL: z.string().url().optional(),
  ENCRYPTION_KEY: z.string().length(32),
  CRON_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);
```

- [ ] **Step 2: Import and use in relevant places (e.g., `lib/auth/server.ts`, `db/client.ts`).**

---

## Final Updated `package.json` (for reference)

Current `package.json` with additions marked:

```json
{
  "name": "ctc",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "biome check",
    "format": "biome format --write",
    "issues:gen": "pnpx @elcoosp-ai/seedling gen",
    "issues:sync": "pnpx @elcoosp-ai/seedling sync --repo elcoosp/skilldeck --dir ./docs/issues",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit push",
    "test": "vitest",
    "test:e2e": "playwright test",
    "generate:openapi": "NODE_OPTIONS='--import=tsx' next-rest-framework generate",
    "validate:openapi": "NODE_OPTIONS='--import=tsx' next-rest-framework validate"
  },
  "dependencies": {
    "@better-auth/drizzle-adapter": "^1.5.5",
    "@tursodatabase/database": "^0.5.1",
    "better-auth": "^1.5.5",
    "better-sqlite3": "^12.8.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "dotenv": "^17.3.1",
    "drizzle-orm": "1.0.0-beta.17-67b1795",
    "lucide-react": "^0.577.0",
    "next": "16.1.6",
    "next-rest-framework": "^5.1.12",
    "next-themes": "^0.4.6",
    "radix-ui": "^1.4.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "shadcn": "^4.0.7",
    "tailwind-merge": "^3.5.0",
    "tw-animate-css": "^1.4.0",
    "zod": "^4.0.14"
  },
  "devDependencies": {
    "@better-auth/cli": "^1.4.21",
    "@biomejs/biome": "2.2.0",
    "@playwright/test": "^1.58.0",
    "@tailwindcss/postcss": "^4",
    "@types/better-sqlite3": "^7.6.13",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitest/ui": "^4.1.0-beta.3",
    "babel-plugin-react-compiler": "1.0.0",
    "drizzle-kit": "^1.0.0-beta.17-67b1795",
    "jsdom": "^26.1.0",
    "tailwindcss": "^4",
    "tsx": "^4.21.0",
    "typescript": "^5",
    "vitest": "^4.1.0-beta.3"
  }
}
```

**Note:** The above `package.json` includes the added dependencies. You may need to adjust versions based on actual compatibility.

---

**Implementation Order:**  
1. Complete remaining steps in Chunk 1 (Tasks 1.4, 1.5, 1.6).  
2. Proceed sequentially through Chunks 2–5.  
3. Regularly run `pnpm lint` and `pnpm format` to maintain code quality.  
4. After each task, commit with a descriptive message.

**Checklist Overview:**

- [x] Task 1.1 – Database schema and migrations
- [x] Task 1.2 – Authentication with GitHub (better-auth)
- [x] Task 1.3 – Dashboard layout and user profile (partial usage counters)
- [ ] Task 1.4 – next-rest-framework and OpenAPI
- [ ] Task 1.5 – GitHub API client and repo selector
- [ ] Task 1.6 – Agent registry with mock LLM
- [ ] Task 2.1 – Workflow model and API
- [ ] Task 2.2 – Workflow editor UI
- [ ] Task 3.1 – Workflow execution engine
- [ ] Task 3.2 – Run details UI and polling
- [ ] Task 4.1 – GitHub PR connector
- [ ] Task 4.2 – Sandbox mode and quota (already in run endpoint)
- [ ] Task 4.3 – Real Ollama integration
- [ ] Task 5.1 – End-to-end testing
- [ ] Task 5.2 – UI polish and dark mode
- [ ] Task 5.3 – Environment validation

This updated plan reflects the actual state of the codebase and provides clear, actionable steps to complete the MVP. Good luck!
