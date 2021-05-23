import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import BlockService from '../../services/block';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';

export default class HeaderComponent extends Component<{}> {
  @service('block') declare blockService: BlockService;

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
