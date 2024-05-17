import { useEffect } from 'react';

export const useLinkOpener = (link: string) => {
  useEffect(() => {
    // Check if window is available (client-side) before using it
    if (typeof window !== 'undefined') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }, [link]);
};

