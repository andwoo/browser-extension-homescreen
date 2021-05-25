import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ViewBlockArgs } from '../../../content';
import { action } from '@ember/object';

export default class ViewRedditComponent extends Component<ViewBlockArgs> {
  @tracked reddit: string = '';

  @action initialize(): void {
    const parsed = JSON.parse(this.args.item.payload ?? '{}');
    this.reddit = parsed.reddit ?? '';
  }
}
