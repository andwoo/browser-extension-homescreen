import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ThemeService, { Theme } from '../../services/theme';

export default class ThemeToggleComponent extends Component<{}> {
  @service('theme') declare theme: ThemeService;

  @tracked isLightTheme: boolean = false;

  @action initialize(): void {
    this.isLightTheme = this.theme.name === Theme.Light;
  }

  @action onUpdateTheme(): void {
    this.theme.setTheme(this.isLightTheme ? Theme.Light : Theme.Dark);
  }
}
