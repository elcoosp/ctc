import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth/server';
import { db } from '@/db/client';
import { workflows, workflowVersions } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { WorkflowForm } from '@/components/workflows/workflow-form';

export default async function WorkflowEditPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Please sign in</div>;
  }

  const workflow = await db
    .select()
    .from(workflows)
    .where(and(eq(workflows.id, params.id), eq(workflows.userId, session.user.id)))
    .get();

  if (!workflow) {
    notFound();
  }

  const versions = await db
    .select()
    .from(workflowVersions)
    .where(eq(workflowVersions.workflowId, params.id))
    .orderBy(workflowVersions.version)
    .all();

  const latest = versions[versions.length - 1];

  // For now, we'll use a client component for the form with initial data
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Edit Workflow: {workflow.name}</h1>
      <WorkflowForm
        initialDefinition={latest?.definition}
        workflowId={workflow.id}
        workflowName={workflow.name}
      />
    </div>
  );
}
