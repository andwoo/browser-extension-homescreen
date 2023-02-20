import { tracked } from '@glimmer/tracking';

export interface RedditPayload_V1 {
  reddit: string;
}

export interface RedditPayload_V2 {
  version: number;
  reddits: string[];
}

export class RedditPayload implements RedditPayload_V2 {
  version: number = 2;
  @tracked reddits: string[] = [];
  constructor({ reddits }: { reddits: string[] }) {
    this.reddits = reddits;
  }
}
