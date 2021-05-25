import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { EditBlockArgs } from '../../../content';
import { action } from '@ember/object';
import Launcher from '../../../../models/launcher';

export default class EditLauncherComponent extends Component<EditBlockArgs> {
  @tracked launchers: Launcher[] = [];

  @action initialize(): void {
    const parsed = JSON.parse(this.args.item.payload ?? '{}');
    this.launchers = (parsed?.launchers ?? []).map((json: string) =>
      Launcher.create(json)
    );
  }

  @action onWriteToPayload(): void {
    this.args.item.payload = JSON.stringify({
      launchers: this.launchers.map((launcher) => Launcher.serialize(launcher)),
    });
  }

  @action onAddLauncher(): void {
    this.launchers.addObject(new Launcher({}));
  }

  @action onMoveLauncherUp(launcher: Launcher): void {
    const index = this.launchers.indexOf(launcher);
    if (index >= 1) {
      this.launchers.removeAt(index);
      this.launchers.insertAt(index - 1, launcher);
    }
  }

  @action onMoveLauncherDown(launcher: Launcher): void {
    const index = this.launchers.indexOf(launcher);
    if (index < this.launchers.length - 1) {
      this.launchers.removeAt(index);
      this.launchers.insertAt(index + 1, launcher);
    }
  }

  @action onRemoveLauncher(launcher: Launcher): void {
    this.launchers.removeObject(launcher);
  }

  @action onLaunchIconSelection(): void {
    window.open(
      'https://fontawesome.com/icons?d=gallery&p=2&q=question',
      '_blank'
    );
  }
}
