import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function useLogEvent() {
  const { data: session } = useSession();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(null);

  const logEvent = async (action: string, page?: string) => {
    setLoading(true);
    setError(null);

    if (!session) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const user_address = session?.address;

    if (!page) {
        page = router.pathname;
    }

    try {
      const response = await fetch('/api/insertEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_address,
          page,
          action,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to log user event');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
        setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { logEvent, loading, error, data };
}
