import { toAbsoluteUrl } from '@browser-extension/utility-url';

export const getImageOrDefault = (url: string): string => {
  return url || toAbsoluteUrl('/build/resources/anchor.svg');
};
