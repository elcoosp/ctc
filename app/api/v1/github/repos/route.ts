import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import { fetchUserRepos } from '@/lib/github';
import * as z from 'zod';

const repoShape = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  private: z.boolean(),
  html_url: z.string(),
});

export const { GET } = route({
  getRepos: routeOperation({ method: 'GET' })
    .outputs([
      {
        status: 200,
        contentType: 'application/json',
        body: z.array(repoShape),
      },
      {
        status: 401,
        contentType: 'application/json',
        body: z.object({ error: z.string() }),
      },
      {
        status: 500,
        contentType: 'application/json',
        body: z.object({ error: z.string() }),
      },
    ])
    .handler(async () => {
      try {
        const repos = await fetchUserRepos();
        return TypedNextResponse.json(repos, { status: 200 });
      } catch (error) {
        const message = (error as Error).message;
        if (message === 'Not authenticated' || message === 'No access token') {
          return TypedNextResponse.json({ error: message }, { status: 401 });
        }
        return TypedNextResponse.json({ error: message }, { status: 500 });
      }
    }),
});
