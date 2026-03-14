// lib/github.ts
import { auth } from './auth/server';

export async function fetchUserRepos() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error('Not authenticated');
  if (!session.user?.accessToken) throw new Error('No access token');

  const response = await fetch('https://api.github.com/user/repos?per_page=100&sort=updated', {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) throw new Error('Failed to fetch repos');
  return response.json();
}
