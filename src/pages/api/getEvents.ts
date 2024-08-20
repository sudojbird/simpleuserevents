import { sql } from '@vercel/postgres';
import { getServerSession } from "next-auth/next"
import { getAuthOptions } from './auth/[...nextauth]';

export default async function handler(req: any, res: any) {
  const authOptions = getAuthOptions(req);
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." })
    return
  }

  try {
    const events = await sql`
      SELECT * FROM events ORDER BY created_at DESC LIMIT 10;
    `;

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events, try logging in.' });
  }
}