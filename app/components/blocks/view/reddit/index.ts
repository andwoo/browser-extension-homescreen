import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ViewBlockArgs } from '../../../content';
import { action } from '@ember/object';
import axios from 'axios';
import { taskFor, perform } from 'ember-concurrency-ts';
import { restartableTask, hash, task } from 'ember-concurrency';
import ThemeService from '../../../../services/theme';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { Tags } from '../../../media-box';
import { migrateRedditPayload } from '../../../../migrators/reddit-payload-migrator';
import { RedditPayload } from '../../../../classes/reddit-payload';

interface RedditPostResponse {
  data: {
    title: string;
    url: string;
    score: string;
    thumbnail: string;
    url_overridden_by_dest: string;
    permalink: string;
  };
}

interface RedditPost {
  title: string;
  thumbnail: string;
  hasThumbnail: boolean;
  postUrl: string;
  commentsUrl: string;
  upVotes: number;
  tags: Tags[];
}

interface RedditData {
  reddit: string;
  posts: RedditPost[];
  isFailure: boolean;
}

const parser: DOMParser = new DOMParser();
const decodeString = (value: string) =>
  parser.parseFromString('<!doctype html><body>' + value, 'text/html').body
    .textContent;

export default class ViewRedditComponent extends Component<ViewBlockArgs> {
  @service('theme') declare theme: ThemeService;
  @tracked reddits: string[] = [];

  get isLoading(): boolean {
    return taskFor(this.fetchSubreddits).isRunning;
  }

  get fallbackThumbnail(): string {
    return `/dist/unknown-${this.theme.name.toLowerCase()}.svg`;
  }

  @action initialize(): void {
    const parsed = JSON.parse(this.args.item.payload ?? '{}');
    const payload: RedditPayload = migrateRedditPayload(parsed);
    this.reddits = payload.reddits;
    perform(this.fetchSubreddits);
  }

  @restartableTask async fetchSubreddits(): Promise<RedditData[]> {
    const results = await hash(
      this.reddits.reduce(
        (acc: { [key: string]: Promise<RedditData> }, reddit) => {
          acc[reddit] = perform(this.fetchPosts, reddit);
          return acc;
        },
        {}
      )
    );
    return Object.values(results);
  }

  @task async fetchPosts(reddit: string): Promise<RedditData> {
    try {
      const response = await axios.get(`https://reddit.com/r/${reddit}.json`);
      const posts = response.data.data.children.map(
        (post: RedditPostResponse) => {
          let thumbnail: string = isEmpty(post.data.thumbnail)
            ? post.data.url_overridden_by_dest
            : post.data.thumbnail;

          const hasThumbnail: boolean = !(
            isEmpty(thumbnail) ||
            thumbnail === 'self' ||
            thumbnail === 'spoiler' ||
            thumbnail === 'nsfw' ||
            !urlHasExtension(thumbnail)
          );

          const tags: Tags[] = [];
          if (thumbnail === 'nsfw') {
            tags.push({
              label: 'NSFW',
              icon: 'fas fa-exclamation-circle',
              type: 'warning',
            });
          } else if (thumbnail === 'spoiler') {
            tags.push({
              label: 'Spoiler',
              icon: 'fas fa-eye-slash',
              type: 'info',
            });
          }

          return {
            title: decodeString(post.data.title),
            thumbnail,
            hasThumbnail,
            postUrl: post.data.url,
            commentsUrl: `https://reddit.com${post.data.permalink}`,
            upVotes: post.data.score,
            tags,
          };
        }
      );
      return {
        reddit,
        posts,
        isFailure: false,
      };
    } catch {
      return {
        reddit,
        posts: [],
        isFailure: true,
      };
    }
  }
}

const urlHasExtension = (url: string): boolean => {
  if (!isEmpty(url)) {
    let parts = url.split('/');
    let lastPart = parts.lastObject;
    return parts.length > 3 && lastPart?.indexOf('.') != -1;
  }
  return false;
};
