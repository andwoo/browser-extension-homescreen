import { RSSPayload, RSSPayload_V1 } from '../classes/rss-payload';

export function migrateRSSPayload(payload: RSSPayload_V1): RSSPayload {
  return new RSSPayload({ urls: [...(payload.urls ?? [])] });
}
