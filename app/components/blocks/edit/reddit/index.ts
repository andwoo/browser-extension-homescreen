import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { EditBlockArgs } from '../../../content';
import { action } from '@ember/object';
import { migrateRedditPayload } from '../../../../migrators/reddit-payload-migrator';
import { RedditPayload } from '../../../../classes/reddit-payload';

class EditReddit {
  @tracked reddit: string = '';
  constructor(reddit: string) {
    this.reddit = reddit;
  }
}
export default class EditRedditComponent extends Component<EditBlockArgs> {
  @tracked reddits: EditReddit[] = [];
  payload: RedditPayload | undefined;

  @action initialize(): void {
    const parsed = JSON.parse(this.args.item.payload ?? '{}');
    this.payload = migrateRedditPayload(parsed);
    this.reddits = this.payload.reddits.map((reddit) => new EditReddit(reddit));
  }

  @action onWriteToPayload(): void {
    this.args.item.payload = JSON.stringify({
      reddits: this.reddits.map((entry) => entry.reddit) ?? [],
      version: this.payload?.version,
    });
  }

  @action addSubreddit(): void {
    this.reddits.push(new EditReddit(''));
    // eslint-disable-next-line no-self-assign
    this.reddits = this.reddits;
  }

  @action removeSubreddit(index: number): void {
    this.reddits.removeAt(index);
    // eslint-disable-next-line no-self-assign
    this.reddits = this.reddits;
  }
}
