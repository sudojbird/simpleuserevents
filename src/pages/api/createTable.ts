import { sql } from '@vercel/postgres';

export default async function handler(req: any, res: any) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        user_address VARCHAR(255) NOT NULL,
        page VARCHAR(255) NOT NULL,
        action VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    res.status(200).json({ message: 'Table created successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create table' });
  }
}