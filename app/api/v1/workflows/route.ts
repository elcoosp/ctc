// app/api/v1/workflows/route.ts
import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
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
      { status: 500, contentType: 'application/json', body: z.object({ error: z.string() }) },
    ])
    .handler(async (req) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) {
        return TypedNextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const { name, definition } = await req.json();

      const workflowId = crypto.randomUUID();
      const now = new Date();

      try {
        await db.insert(workflows).values({
          id: workflowId,
          userId: session.user.id,
          name,
          createdAt: now,
          updatedAt: now,
        });

        await db.insert(workflowVersions).values({
          id: crypto.randomUUID(),
          workflowId,
          version: 1,
          definition,
          createdAt: now,
        });

        return TypedNextResponse.json({ id: workflowId }, { status: 201 });
      } catch (error) {
        console.error('Failed to create workflow:', error);
        return TypedNextResponse.json({ error: 'Internal server error' }, { status: 500 });
      }
    }),

  listWorkflows: routeOperation({ method: 'GET' })
    .outputs([
      {
        status: 200, contentType: 'application/json', body: z.array(z.object({
          id: z.string(),
          name: z.string(),
          currentVersionId: z.string().nullable(),
          createdAt: z.date(),
          updatedAt: z.date(),
        }))
      },
      { status: 401, contentType: 'application/json', body: z.object({ error: z.string() }) },
    ])
    .handler(async () => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) {
        return TypedNextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const userWorkflows = await db
        .select()
        .from(workflows)
        .where(eq(workflows.userId, session.user.id));

      return TypedNextResponse.json(userWorkflows, { status: 200 });
    }),
});
