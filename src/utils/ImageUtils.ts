import { toAbsoluteUrl } from '@browser-extension/utility-url';

export const getImageOrDefault = (url: string): string => {
  if (url && url.length > 0 && url.includes('http')) {
    return url;
  }
  return toAbsoluteUrl('/build/resources/anchor.svg');
};
