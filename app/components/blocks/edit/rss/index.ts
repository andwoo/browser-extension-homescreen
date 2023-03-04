import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { EditBlockArgs } from '../../../content';
import { action } from '@ember/object';
import { RSSPayload } from '../../../../classes/rss-payload';
import { migrateRSSPayload } from '../../../../migrators/rss-payload-migrator';

class EditRSS {
  @tracked url: string = '';
  constructor(url: string) {
    this.url = url;
  }
}
export default class EditRedditComponent extends Component<EditBlockArgs> {
  @tracked rss: EditRSS[] = [];
  payload: RSSPayload | undefined;

  @action initialize(): void {
    const parsed = JSON.parse(this.args.item.payload ?? '{}');
    this.payload = migrateRSSPayload(parsed);
    this.rss = this.payload.urls.map((url) => new EditRSS(url));
  }

  @action onWriteToPayload(): void {
    this.args.item.payload = JSON.stringify({
      urls: this.rss.map((entry) => entry.url) ?? [],
      version: this.payload?.version,
    });
  }

  @action addFeed(): void {
    this.rss.push(new EditRSS(''));
    // eslint-disable-next-line no-self-assign
    this.rss = this.rss;
  }

  @action removeFeed(index: number): void {
    this.rss.removeAt(index);
    // eslint-disable-next-line no-self-assign
    this.rss = this.rss;
  }
}
