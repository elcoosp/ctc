'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RepoSelector } from '@/components/repo-selector';
import { agents } from '@/agents/registry';
import { Card } from '@/components/ui/card';
import { NodeList } from './node-list';

type WorkflowNode = {
  id: string;
  agent: string;
  inputs: Record<string, any>;
};

interface WorkflowFormProps {
  onSubmit?: (definition: any) => void;
  initialDefinition?: any;
  workflowId?: string;
  workflowName?: string;
}

export function WorkflowForm({
  onSubmit,
  initialDefinition,
  workflowId,
  workflowName: initialName,
}: WorkflowFormProps) {
  const router = useRouter();
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialDefinition?.nodes || []);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(
    initialDefinition?.repository || null
  );
  const [name, setName] = useState(initialName || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addNode = (agentName: string) => {
    setNodes([...nodes, { id: crypto.randomUUID(), agent: agentName, inputs: {} }]);
  };

  const removeNode = (nodeId: string) => {
    setNodes(nodes.filter((n) => n.id !== nodeId));
  };

  const handleSubmit = async () => {
    if (!selectedRepo || nodes.length === 0 || !name) return;

    setIsSubmitting(true);
    const definition = {
      nodes,
      edges: [], // For MVP, edges are ignored; we assume sequential order
      repository: selectedRepo,
    };

    const url = workflowId ? `/api/v1/workflows/${workflowId}` : '/api/v1/workflows';
    const method = workflowId ? 'PUT' : 'POST';
    const body = workflowId
      ? JSON.stringify({ name, definition })
      : JSON.stringify({ name, definition });

    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body });
      if (res.ok) {
        if (workflowId) {
          router.push(`/dashboard/workflows/${workflowId}`);
        } else {
          const { id } = await res.json();
          router.push(`/dashboard/workflows/${id}`);
        }
      } else {
        console.error('Failed to save workflow');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Repository</label>
        <RepoSelector onSelect={setSelectedRepo} value={selectedRepo || undefined} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Agents</label>
        <div className="flex gap-2 flex-wrap">
          {Object.keys(agents).map((agentName) => (
            <Button
              key={agentName}
              type="button"
              variant="outline"
              onClick={() => addNode(agentName)}
            >
              Add {agentName}
            </Button>
          ))}
        </div>
      </div>

      <NodeList nodes={nodes} onRemoveNode={removeNode} />

      <Button onClick={handleSubmit} disabled={!selectedRepo || nodes.length === 0 || !name || isSubmitting}>
        {workflowId ? 'Update Workflow' : 'Create Workflow'}
      </Button>
    </div>
  );
}
