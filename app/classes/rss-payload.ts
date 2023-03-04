import { tracked } from '@glimmer/tracking';

export interface RSSPayload_V1 {
  version: number;
  urls: string[];
}

export class RSSPayload implements RSSPayload_V1 {
  version: number = 1;
  @tracked urls: string[] = [];
  constructor({ urls }: { urls?: string[] }) {
    this.urls = urls ?? [];
  }
}
