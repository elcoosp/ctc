// app/api/v1/workflows/[id]/versions/route.ts
import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import * as z from 'zod';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth/server';
import { db } from '@/db/client';
import { workflows, workflowVersions } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

const versionSchema = z.object({
  id: z.string(),
  workflowId: z.string(),
  version: z.number(),
  definition: z.any(),
  changelog: z.string().nullable(),
  createdAt: z.date(),
});

export const { GET } = route({
  getVersions: routeOperation({ method: 'GET' })
    .outputs([
      { status: 200, contentType: 'application/json', body: z.array(versionSchema) },
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

      // Verify workflow ownership
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

      const versions = db
        .select()
        .from(workflowVersions)
        .where(eq(workflowVersions.workflowId, params.id))
        .orderBy(workflowVersions.version)
        .all();

      return TypedNextResponse.json(versions, { status: 200 });
    }),
});
