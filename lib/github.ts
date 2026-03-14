import { headers } from 'next/headers';
import { auth } from './auth/server';
import { db } from '@/db/client';
import { accounts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function fetchUserRepos() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error('Not authenticated');

  // Fetch the GitHub account access token from the database
  const userAccounts = db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, session.user.id))
    .all();

  const githubAccount = userAccounts.find(acc => acc.providerId === 'github');
  if (!githubAccount) throw new Error('No GitHub account linked');
  if (!githubAccount.accessToken) throw new Error('No access token found');

  const accessToken = githubAccount.accessToken;

  const response = await fetch('https://api.github.com/user/repos?per_page=100&sort=updated', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) throw new Error('Failed to fetch repos');
  return response.json();
}
