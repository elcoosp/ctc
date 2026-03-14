import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/client';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite', // or 'pg' / 'mysql'
    usePlural: true,    // because our tables are plural (users, accounts, etc.)
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scope: ['read:user', 'user:email', 'repo'],
    },
  },
  strategy: 'jwt',
  user: {
    // Map custom fields if needed; we already aligned field names, so no mapping required.
    // If you want to keep 'avatarUrl' instead of 'image', you could map:
    // fields: { image: 'avatarUrl' }
  },
});
