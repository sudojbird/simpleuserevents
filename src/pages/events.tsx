import { useEffect, useState } from 'react';
import type { Event } from '../types/types';
import { useSession } from 'next-auth/react';

export default function Events() {
  const { status: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session !== 'authenticated') {
        return;
    }
    setLoading(true);
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/getEvents');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data.rows);
      } catch (err: any) {
        setError(err.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [session]);

  const rowStyle = 'py-4 pr-12 border-b border-gray-200';

  return (
    <div className='flex item-center justify-center p-10'>
      <table>
        <thead>
          <tr className='text-left'>
            <th className={`${rowStyle}`}>ID</th>
            <th className={`${rowStyle}`}>User Address</th>
            <th className={`${rowStyle}`}>Page</th>
            <th className={`${rowStyle}`}>Action</th>
            <th className={`${rowStyle}`}>Created At</th>
          </tr>
        </thead>
        {session !== "authenticated" ? (<p className='text-center p-2'>Connect to View Events</p>) : loading ? (<p>Loading events...</p>) : (
        <tbody>
          {Array.isArray(events) && events.map((event) => (
            <tr key={event.id} className=''>
              <td className={`${rowStyle}`}>{event.id}</td>
              <td className={`${rowStyle}`}>{event.user_address}</td>
              <td className={`${rowStyle}`}>{event.page}</td>
              <td className={`${rowStyle}`}>{event.action}</td>
              <td className={`${rowStyle}`}>{new Date(event.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        )}
      </table>
    </div>
  );
}
