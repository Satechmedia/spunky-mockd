import { useState, useEffect } from 'react';

export const useGenerateLink = (referralCode: string | null | undefined) => {
  const [referralLink, setReferralLink] = useState<string | null>(null);

  useEffect(() => {
    // Check if window is available (client-side) before using it
    if (typeof window !== 'undefined') {
      const baseURL = `${window.location.protocol}//${window.location.host}/register?referralCode=`;
      setReferralLink(baseURL + referralCode);
    }
  }, [referralCode]);

  return referralLink;
};

