import { headers } from 'next/headers';
import Link from 'next/link';
import { auth } from '@/lib/auth/server';
import { db } from '@/db/client';
import { workflows } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function WorkflowsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Please sign in</div>;
  }

  const userWorkflows = await db
    .select()
    .from(workflows)
    .where(eq(workflows.userId, session.user.id))
    .all();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Workflows</h1>
        <Link href="/dashboard/workflows/new">
          <Button>New Workflow</Button>
        </Link>
      </div>

      {userWorkflows.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p>No workflows yet. Create your first workflow to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {userWorkflows.map((wf) => (
            <Link key={wf.id} href={`/dashboard/workflows/${wf.id}`}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle>{wf.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Created {new Date(wf.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
