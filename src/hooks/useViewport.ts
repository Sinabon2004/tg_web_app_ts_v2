import { useEffect, useState } from 'react';
import { initViewport, type Viewport } from '@telegram-apps/sdk';

export function useViewport() {
  const [viewport, setViewport] = useState<any>();

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const [viewportPromise] = initViewport();
      const vp = await viewportPromise;

      if (!vp.isExpanded) {
        await vp.expand();
      }

      if (isMounted) {
        setViewport(vp);
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  return viewport;
}
