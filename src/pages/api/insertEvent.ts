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

  if (req.method === 'POST') {
    const { user_address, page, action } = req.body;

    try {
      const result = await sql`
        INSERT INTO events (user_address, page, action) 
        VALUES (${user_address}, ${page}, ${action})
        RETURNING *;
      `;

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to insert event' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
