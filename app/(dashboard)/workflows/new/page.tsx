'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WorkflowForm } from '@/components/workflows/workflow-form';

export default function NewWorkflowPage() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = async (definition: any) => {
    const res = await fetch('/api/v1/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, definition }),
    });
    if (res.ok) {
      const { id } = await res.json();
      router.push(`/dashboard/workflows/${id}`);
    } else {
      // handle error (you could add a toast later)
      console.error('Failed to create workflow');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Create New Workflow</h1>
      <div className="max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Workflow Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My workflow"
          />
        </div>
        <WorkflowForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
