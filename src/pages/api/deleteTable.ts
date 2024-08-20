import { sql } from '@vercel/postgres';

export default async function handler(req: any, res: any) {
  try {
    const result = await sql`
      DROP TABLE IF EXISTS events;
    `;
    res.status(200).json({ message: 'Table dropped successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to drop table' });
  }
}