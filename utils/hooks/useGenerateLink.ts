export const useGenerateLink = (referralCode: string | null | undefined) => {
  const baseURL = `${window.location.protocol}//${window.location.host}/register?referralCode=`;
  const referralLink = baseURL + referralCode;

  return referralLink;
};

