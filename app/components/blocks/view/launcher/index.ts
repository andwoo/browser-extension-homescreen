import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { ViewBlockArgs } from '../../../content';
import Launcher from '../../../../models/launcher';

export default class ViewLauncherComponent extends Component<ViewBlockArgs> {
  @tracked launchers: Launcher[] = [];

  @action initialize(): void {
    const parsed = JSON.parse(this.args.item.payload ?? '{}');
    this.launchers = (parsed?.launchers ?? []).map((json: string) =>
      Launcher.create(json)
    );
  }
}
