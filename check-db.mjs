import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL);
const res = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;
console.log(res.map(r => r.table_name));
process.exit(0);
