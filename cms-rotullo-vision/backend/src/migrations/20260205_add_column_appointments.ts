import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
    await payload.db.drizzle.execute(sql`
    ALTER TABLE "appointments" ADD COLUMN IF NOT EXISTS "abandoned_email_sent" boolean;
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
    await payload.db.drizzle.execute(sql`
    ALTER TABLE "appointments" DROP COLUMN IF EXISTS "abandoned_email_sent";
  `)
}
