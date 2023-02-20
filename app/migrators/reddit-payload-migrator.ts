import {
  RedditPayload,
  RedditPayload_V1,
  RedditPayload_V2,
} from '../classes/reddit-payload';

export function migrateRedditPayload(
  payload: RedditPayload_V1 | RedditPayload_V2
): RedditPayload {
  if ('reddit' in payload) {
    return new RedditPayload({ reddits: [payload.reddit] });
  }
  return new RedditPayload({ reddits: [...(payload.reddits ?? [])] });
}
