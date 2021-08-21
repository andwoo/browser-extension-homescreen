import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ViewBlockArgs } from '../../../content';
import { action } from '@ember/object';
import axios from 'axios';
import { taskFor, perform } from 'ember-concurrency-ts';
import { restartableTask, TaskGenerator } from 'ember-concurrency';
import ThemeService from '../../../../services/theme';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

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
  type: 'default' | 'nsfw' | 'spoiler';
}

const parser: DOMParser = new DOMParser();
const decodeString = (value: string) =>
  parser.parseFromString('<!doctype html><body>' + value, 'text/html').body
    .textContent;

export default class ViewRedditComponent extends Component<ViewBlockArgs> {
  @service('theme') declare theme: ThemeService;
  @tracked reddit: string = '';

  get posts(): RedditPost[] {
    return taskFor(this.fetchPosts).lastSuccessful?.value ?? [];
  }

  get isLoading(): boolean {
    return taskFor(this.fetchPosts).isRunning;
  }

  get isFailure(): boolean {
    return !!taskFor(this.fetchPosts).lastErrored;
  }

  get fallbackThumbnail(): string {
    return `/dist/unknown-${this.theme.name.toLowerCase()}.svg`;
  }

  @action initialize(): void {
    const parsed = JSON.parse(this.args.item.payload ?? '{}');
    this.reddit = parsed.reddit ?? '';
    perform(this.fetchPosts, this.reddit);
  }

  @restartableTask *fetchPosts(reddit: string): TaskGenerator<RedditPost[]> {
    const response = yield axios.get(`https://reddit.com/r/${reddit}.json`);
    return response.data.data.children.map((post: RedditPostResponse) => {
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

      return {
        title: decodeString(post.data.title),
        thumbnail,
        hasThumbnail,
        postUrl: post.data.url,
        commentsUrl: `https://reddit.com${post.data.permalink}`,
        upVotes: post.data.score,
        type: post.data.thumbnail,
      };
    });
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
