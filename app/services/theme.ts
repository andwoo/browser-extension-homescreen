import Service from '@ember/service';
import { tracked } from '@glimmer/tracking'

export enum Theme {
  Light = 'Light',
  Dark = 'Dark'
}
const themeKey = 'themeName'

const cssVariables: {[key: string]: {Light: string, Dark: string}} = {
  '--bg-color': {
    Light: '#EFE6DD',
    Dark: '#fc92e3'
  }
}

export default class ThemeService extends Service {
  @tracked name: Theme = Theme.Light

  get isLightTheme(): boolean {
    return this.name === Theme.Light
  }

  async initialize(): Promise<void> {
    const value = window.localStorage.getItem(themeKey)
    //@ts-ignore
    this.setTheme(Theme[value] ?? Theme.Light)
  }

  setTheme(name: Theme): void {
    this.name = name
    window.localStorage.setItem(themeKey, this.name)
    this.setThemeValues()
  }

  setThemeValues(): void {
    const element = document.documentElement
    if(element) {
      Object.keys(cssVariables).forEach(key => element.style.setProperty(key, cssVariables[key][this.isLightTheme ? Theme.Light : Theme.Dark]))
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'theme': Theme;
  }
}

