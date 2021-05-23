import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { EditBlockArgs } from '../../content';
import { action } from '@ember/object';

export default class EditTwitchComponent extends Component<EditBlockArgs> {
  @tracked accessToken: string = '';

  @action initialize(): void {
    const parsed = JSON.parse(this.args.item.payload ?? '{}');
    this.accessToken = parsed.accessToken ?? '';
  }

  @action onWriteToPayload(): void {
    this.args.item.payload = JSON.stringify({
      accessToken: this.accessToken ?? '',
    });
  }

  @action onLaunchTwitchTokenUrl(): void {
    window.open('https://twitchtokengenerator.com/quick/32YIH8dT3q', '_blank');
  }
}
