import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  githubId: integer('github_id').unique().notNull(),
  email: text('email').notNull(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  plan: text('plan', { enum: ['free', 'pro'] }).default('free').notNull(),
  usageMonth: integer('usage_month').default(0).notNull(),
  sandboxUsed: integer('sandbox_used').default(0).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  sessionToken: text('session_token').notNull().unique(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp' }).notNull(),
});

export const verificationTokens = sqliteTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: integer('expires', { mode: 'timestamp' }).notNull(),
});

export const workflows = sqliteTable('workflows', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  currentVersionId: text('current_version_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const workflowVersions = sqliteTable('workflow_versions', {
  id: text('id').primaryKey(),
  workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
  version: integer('version').notNull(),
  definition: text('definition', { mode: 'json' }).notNull(),
  changelog: text('changelog'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const runs = sqliteTable('runs', {
  id: text('id').primaryKey(),
  workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
  status: text('status', { enum: ['pending', 'running', 'completed', 'failed'] }).notNull(),
  startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  nodeResults: text('node_results', { mode: 'json' }).notNull(),
  finalArtifacts: text('final_artifacts', { mode: 'json' }),
  sandbox: integer('sandbox', { mode: 'boolean' }).default(false).notNull(),
});

export const connectors = sqliteTable('connectors', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['github-pr', 'wordpress'] }).notNull(),
  config: text('config', { mode: 'json' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});