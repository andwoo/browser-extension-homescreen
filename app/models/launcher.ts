import { tracked } from '@glimmer/tracking';

export default class Launcher {
  @tracked icon: string = '';
  @tracked url: string = '';

  constructor({ icon = '', url = '' }: { icon?: string; url?: string }) {
    this.icon = icon;
    this.url = url;
  }

  static create(json: string): Launcher {
    return new Launcher(JSON.parse(json));
  }

  static serialize(launcher: Launcher): string {
    return JSON.stringify({ icon: launcher.icon, url: launcher.url });
  }
}
