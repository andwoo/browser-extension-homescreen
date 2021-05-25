import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { EditBlockArgs } from '../../../content';
import { action } from '@ember/object';

export default class EditRedditComponent extends Component<EditBlockArgs> {
  @tracked reddit: string = '';

  @action initialize(): void {
    const parsed = JSON.parse(this.args.item.payload ?? '{}');
    this.reddit = parsed.reddit ?? '';
  }

  @action onWriteToPayload(): void {
    this.args.item.payload = JSON.stringify({
      reddit: this.reddit ?? '',
    });
  }
}
