import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useLogEvent from "@/utils/useLogEvent";
import { useSession } from 'next-auth/react';

export function useTrackPageView() {
  const { data: session } = useSession();
  const router = useRouter();
  const { logEvent } = useLogEvent();

  useEffect(() => {
    if (!session) {
      return;
    }
    
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean },
    ) => {
      if (shallow) return;
      logEvent('page view', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, logEvent, session]);
}

export function PageViewTracker() {
  useTrackPageView();
  return null;
}

