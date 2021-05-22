import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ThemeService from '../services/theme';
import BlockService from '../services/block';
import { getOwner } from '@ember/application';

export default class Main extends Route {
  @service('theme') declare theme: ThemeService;
  @service('block') declare block: BlockService;

  async beforeModel(): Promise<void> {
    await this.theme.initialize();
    await this.block.initialize(getOwner(this));
  }
}
