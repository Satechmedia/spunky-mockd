import { useEffect } from 'react';

export const useLinkOpener = (link: string) => {
  if (typeof window !== 'undefined') {
    window.open(link, '_blank', 'noopener,noreferrer');
  }
};

