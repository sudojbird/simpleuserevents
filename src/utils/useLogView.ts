import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useLogEvent from "@/utils/useLogEvent";

export function useTrackPageView() {
  const router = useRouter();
  const { logEvent } = useLogEvent();

  useEffect(() => {
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
  }, [router.events, logEvent]);
}

export function PageViewTracker() {
  useTrackPageView();
  return null;
}

