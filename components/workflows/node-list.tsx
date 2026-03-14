import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface NodeListProps {
  nodes: Array<{ id: string; agent: string; inputs: any }>;
  onRemoveNode: (nodeId: string) => void;
}

export function NodeList({ nodes, onRemoveNode }: NodeListProps) {
  if (nodes.length === 0) {
    return (
      <Card className="p-4 text-center text-muted-foreground">
        No agents added yet. Click an agent button above.
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {nodes.map((node, idx) => (
        <Card key={node.id} className="p-4 relative">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">
                {idx + 1}. {node.agent}
              </p>
              <p className="text-xs text-muted-foreground">ID: {node.id.slice(0, 8)}...</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onRemoveNode(node.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
