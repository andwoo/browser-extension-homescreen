import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

interface Args {
  imageSrc: string;
  imageAlt: string;
  imageUrl: string;
  url: string;
}
export default class MediaBoxComponent extends Component<Args> {
  @action onLaunchImageUrl(): void {
    if (!isEmpty(this.args.imageUrl)) {
      window.open(this.args.imageUrl, '_blank');
    }
  }

  @action onLaunchUrl(): void {
    if (!isEmpty(this.args.url)) {
      window.open(this.args.url, '_blank');
    }
  }
}
