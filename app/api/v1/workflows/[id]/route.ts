// app/api/v1/workflows/[id]/route.ts
import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import * as z from 'zod';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth/server';
import { db } from '@/db/client';
import { workflows, workflowVersions } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { workflowDefinitionSchema } from '@/lib/workflow-engine/types';

export const { GET, PUT, DELETE } = route({
  getWorkflow: routeOperation({ method: 'GET' })
    .outputs([
      {
        status: 200, contentType: 'application/json', body: z.object({
          id: z.string(),
          name: z.string(),
          currentVersionId: z.string().nullable(),
          createdAt: z.date(),
          updatedAt: z.date(),
        })
      },
      { status: 401, contentType: 'application/json', body: z.object({ error: z.string() }) },
      { status: 404, contentType: 'application/json', body: z.object({ error: z.string() }) },
    ])
    .handler(async (req, { params }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) {
        return TypedNextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const workflow = db
        .select()
        .from(workflows)
        .where(and(
          eq(workflows.id, params.id),
          eq(workflows.userId, session.user.id)
        ))
        .get();

      if (!workflow) {
        return TypedNextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      return TypedNextResponse.json(workflow, { status: 200 });
    }),

  updateWorkflow: routeOperation({ method: 'PUT' })
    .input({
      contentType: 'application/json',
      body: z.object({
        name: z.string().optional(),
        definition: workflowDefinitionSchema.optional(),
      }),
    })
    .outputs([
      { status: 200, contentType: 'application/json', body: z.object({ success: z.boolean() }) },
      { status: 401, contentType: 'application/json', body: z.object({ error: z.string() }) },
      { status: 404, contentType: 'application/json', body: z.object({ error: z.string() }) },
      { status: 500, contentType: 'application/json', body: z.object({ error: z.string() }) },
    ])
    .handler(async (req, { params }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) {
        return TypedNextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const workflow = db
        .select()
        .from(workflows)
        .where(and(
          eq(workflows.id, params.id),
          eq(workflows.userId, session.user.id)
        ))
        .get();

      if (!workflow) {
        return TypedNextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      const { name, definition } = await req.json();

      const updates: any = {};
      if (name) updates.name = name;
      updates.updatedAt = new Date();

      if (definition) {
        try {
          // Get latest version number
          const versions = db
            .select()
            .from(workflowVersions)
            .where(eq(workflowVersions.workflowId, params.id))
            .orderBy(workflowVersions.version)
            .all();

          const nextVersion = versions.length ? versions[versions.length - 1].version + 1 : 1;
          const newVersionId = crypto.randomUUID();

          await db.insert(workflowVersions).values({
            id: newVersionId,
            workflowId: params.id,
            version: nextVersion,
            definition,
            createdAt: new Date(),
          });

          updates.currentVersionId = newVersionId;
        } catch (error) {
          console.error('Failed to create new version:', error);
          return TypedNextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
      }

      await db.update(workflows)
        .set(updates)
        .where(eq(workflows.id, params.id));

      return TypedNextResponse.json({ success: true }, { status: 200 });
    }),

  deleteWorkflow: routeOperation({ method: 'DELETE' })
    .outputs([
      { status: 204, contentType: 'application/json', body: z.undefined() },
      { status: 401, contentType: 'application/json', body: z.object({ error: z.string() }) },
      { status: 404, contentType: 'application/json', body: z.object({ error: z.string() }) },
    ])
    .handler(async (req, { params }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) {
        return TypedNextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const result = db
        .delete(workflows)
        .where(and(
          eq(workflows.id, params.id),
          eq(workflows.userId, session.user.id)
        ))
        .run();

      if (result.changes === 0) {
        return TypedNextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      return new Response(null, { status: 204 });
    }),
});
