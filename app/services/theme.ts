import Service from '@ember/service';
import { tracked } from '@glimmer/tracking'

enum Theme {
  Light = 'Light',
  Dark = 'Dark'
}
const THEMENAME_KEY = 'themeName'

export default class ThemeService extends Service {
  @tracked name: Theme = Theme.Light

  async initialize(): Promise<void> {
    const value = window.localStorage.getItem(THEMENAME_KEY)
    //@ts-ignore
    this.setTheme(Theme[value] ?? Theme.Light)
  }

  setTheme(name: Theme): void {
    this.name = name
    window.localStorage.setItem(THEMENAME_KEY, this.name)
    this.setThemeValues()
  }

  setThemeValues(): void {
    console.log(`setThemeValues() name[${this.name}]`)
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'theme': Theme;
  }
}
