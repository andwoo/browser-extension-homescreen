import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ThemeService from '../services/theme';

export default class Main extends Route {
  @service('theme') declare theme: ThemeService;

  async beforeModel(): Promise<void> {
    await this.theme.initialize();
  }
}
