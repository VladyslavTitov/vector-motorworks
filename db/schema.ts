import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const content = sqliteTable('content', { id: text('id').primaryKey(), document: text('document').notNull(), version: integer('version').notNull().default(1) });
export const appointments = sqliteTable('appointments', { id: text('id').primaryKey(), data: text('data').notNull(), createdAt: text('created_at').notNull(), status: text('status').notNull().default('new') });
export const adminSessions = sqliteTable('admin_sessions', { tokenHash: text('token_hash').primaryKey(), expiresAt: integer('expires_at').notNull() });
export const loginLimits = sqliteTable('login_limits', { key: text('key').primaryKey(), attempts: integer('attempts').notNull(), windowStart: integer('window_start').notNull() });
