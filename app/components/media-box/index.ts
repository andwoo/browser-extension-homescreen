import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

interface Args {
  imageSrc: string;
  imageAlt: string;
  url: string;
}
export default class MediaBoxComponent extends Component<Args> {
  @action onLaunchUrl(): void {
    if (!isEmpty(this.args.url)) {
      window.open(this.args.url, '_blank');
    }
  }
}
