'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Repo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
}

interface RepoSelectorProps {
  onSelect: (repoFullName: string) => void;
  value?: string;
}

export function RepoSelector({ onSelect, value }: RepoSelectorProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/github/repos')
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to load repos');
        }
        return res.json();
      })
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-sm text-muted-foreground">Loading repositories...</div>;
  if (error) return <div className="text-sm text-destructive">Error: {error}</div>;

  return (
    <Select onValueChange={onSelect} value={value}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select a repository" />
      </SelectTrigger>
      <SelectContent>
        {repos.map((repo) => (
          <SelectItem key={repo.id} value={repo.full_name}>
            {repo.full_name} {repo.private && '(private)'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
