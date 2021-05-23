import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import BlockService from '../../services/block';

export default class HeaderComponent extends Component<{}> {
  @service('block') declare blockService: BlockService;
}
