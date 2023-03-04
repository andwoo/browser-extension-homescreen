import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ViewBlockArgs } from '../../../content';
import { action } from '@ember/object';
import axios from 'axios';
import { taskFor, perform } from 'ember-concurrency-ts';
import { restartableTask, hash, task } from 'ember-concurrency';
import ThemeService from '../../../../services/theme';
import { inject as service } from '@ember/service';
import { RSSPayload } from '../../../../classes/rss-payload';
import { migrateRSSPayload } from '../../../../migrators/rss-payload-migrator';
import { DateTime } from 'luxon';

interface RSSPostResponse {
  title?: string;
  link?: string;
  thumbnail?: string;
  pubDate?: string;
}

interface RSSPost {
  title: string;
  thumbnail: string;
  hasThumbnail: boolean;
  url: string;
  pubDate: string;
}

interface RSSData {
  title: string;
  url: string;
  posts: RSSPost[];
  isFailure: boolean;
}

export default class ViewRedditComponent extends Component<ViewBlockArgs> {
  @service('theme') declare theme: ThemeService;
  @tracked urls: string[] = [];

  get isLoading(): boolean {
    return taskFor(this.fetchFeeds).isRunning;
  }

  get fallbackThumbnail(): string {
    return `/dist/unknown-${this.theme.name.toLowerCase()}.svg`;
  }

  @action initialize(): void {
    const parsed = JSON.parse(this.args.item.payload ?? '{}');
    const payload: RSSPayload = migrateRSSPayload(parsed);
    this.urls = payload.urls;
    perform(this.fetchFeeds);
  }

  @restartableTask async fetchFeeds(): Promise<RSSData[]> {
    const results = await hash(
      this.urls.reduce((acc: { [key: string]: Promise<RSSData> }, url) => {
        acc[url] = perform(this.fetchFeed, url);
        return acc;
      }, {})
    );
    return Object.values(results);
  }

  @task async fetchFeed(url: string): Promise<RSSData> {
    try {
      const response = await axios.get(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          url
        )}`
      );
      return {
        title: response.data.feed.title,
        url,
        posts: response.data?.items.map((item: RSSPostResponse) => ({
          title: item.title ?? '',
          thumbnail: item.thumbnail ?? '',
          hasThumbnail: !!item.thumbnail,
          url: item.link ?? '',
          pubDate: DateTime.fromFormat(
            item.pubDate,
            'yyyy-MM-dd hh:mm:ss'
          ).toRelativeCalendar(),
        })),
        isFailure: false,
      };
    } catch {
      return {
        title: '',
        url,
        posts: [],
        isFailure: true,
      };
    }
  }
}
