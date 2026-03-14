import 'dotenv/config';
import { drizzle } from 'drizzle-orm/tursodatabase/database';
export const db = drizzle(process.env.DB_FILE_NAME!);
