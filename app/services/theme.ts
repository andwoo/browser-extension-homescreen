import Service from '@ember/service';
import { tracked } from '@glimmer/tracking'

export enum Theme {
  Light = 'Light',
  Dark = 'Dark'
}
const themeKey = 'themeName'

const cssVariables: {[key: string]: {Light: string, Dark: string}} = {
  '--h-header-bg': {Light: '#6d597a', Dark: '#52796f'},
  '--h-content-bg': {Light: '#fdf6e8', Dark: '#2f3e46'},
  '--h-text': {Light: '#6d597a', Dark: '#cad2c5'},
  /* Buttons */
  '--h-btn-bg-default': {Light: '#6d597a', Dark: '#52796f'},
  '--h-btn-bg-hover-default': {Light: '#355070', Dark: '#84a98c'},
  '--h-btn-txt-default': {Light: '#fdf6e8', Dark: '#cad2c5'},
  '--h-btn-txt-hover-default': {Light: '#fdf6e8', Dark: '#cad2c5'},
  '--h-btn-bg-ghost': {Light: '#6d597a', Dark: '#cad2c5'},
  '--h-btn-bg-hover-ghost': {Light: '#355070', Dark: '#84a98c'},
  '--h-btn-txt-ghost': {Light: '#6d597a', Dark: '#cad2c5'},
  '--h-btn-txt-hover-ghost': {Light: '#355070', Dark: '#84a98c'},
  '--h-btn-bg-transparent': {Light: 'transparent', Dark: 'transparent'},
  '--h-btn-bg-hover-transparent': {Light: '#355070', Dark: '#84a98c'},
  '--h-btn-txt-transparent': {Light: '#6d597a', Dark: '#cad2c5'},
  '--h-btn-txt-hover-transparent': {Light: '#fdf6e8', Dark: '#2f3e46'},
  '--h-btn-bg-danger': {Light: '#e56b6f', Dark: '#e56b6f'},
  '--h-btn-bg-hover-danger': {Light: '#355070', Dark: '#84a98c'},
  '--h-btn-txt-danger': {Light: '#fffffc', Dark: '#fffffc'},
  '--h-btn-txt-hover-danger': {Light: '#fdf6e8', Dark: '#fdf6e8'},
  /* Input */
  '--h-input-bg': {Light: '#fffffc', Dark: '#cad2c5'},
  '--h-input-txt': {Light: '#6d597a', Dark: '#52796f'},
  /* Boxes */
  '--h-box-bg-default': {Light: '#fffcf7', Dark: '#84a98c'},
  '--h-box-txt-default': {Light: '#6d597a', Dark: '#2f3e46'},
  '--h-box-bg-info': {Light: '#eaac8b', Dark: '#cad2c5'},
  '--h-box-txt-info': {Light: '#6d597a', Dark: '#52796f'},
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
    'theme': ThemeService;
  }
}

