import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import BlockService from '../../services/block';
import ThemeService from '../../services/theme';

export default class HeaderComponent extends Component<{}> {
  @service('block') declare blockService: BlockService;
  @service('theme') declare theme: ThemeService;

  get hubLogo(): string {
    return `/dist/hub-logo-${this.theme.name.toLowerCase()}.svg`;
  }
  @action save(): void {
    this.blockService.save(getOwner(this));
    this.blockService.editing = false;
    this.blockService.initialize(getOwner(this));
  }

  @action cancel(): void {
    this.blockService.editing = false;
    this.blockService.initialize(getOwner(this));
  }

  @action edit(): void {
    this.blockService.editing = true;
  }
}
