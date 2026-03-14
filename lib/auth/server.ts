// lib/auth/server.ts
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/client';
import * as schema from '@/db/schema'; // 1. Import the schema

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema, // 2. Pass the schema explicitly
    usePlural: true,
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scope: ['read:user', 'user:email', 'repo'],
    },
  },
  strategy: 'jwt',
});
