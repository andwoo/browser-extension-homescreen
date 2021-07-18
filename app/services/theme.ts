import Service from '@ember/service';
import { tracked } from '@glimmer/tracking'

export enum Theme {
  Light = 'Light',
  Dark = 'Dark'
}
const themeKey = 'themeName'

const cssVariables: {[key: string]: {Light: string, Dark: string}} = {
  /* Header */
  '--h-font-family': {Light: "'Courier New', Courier, monospace", Dark: 'VT323, monospace'},
  /* Header */
  '--h-header-background': {Light: '#6d597a', Dark: '#09141b'},
  '--h-header-text': {Light: '#00ff00', Dark: '#839395'},
  /* Content */
  '--h-content-background': {Light: '#fdf6e8', Dark: '#122733'},
  '--h-content-text': {Light: '#00ff00', Dark: '#839395'},
  /* Button Default */
  '--h-btn-bg-default': {Light: '#6d597a', Dark: 'rgba(138, 155, 0, 0.35)'},
  '--h-btn-txt-default': {Light: '#fdf6e8', Dark: '#8A9B00'},
  '--h-btn-bg-hover-default': {Light: '#355070', Dark: '#8A9B00'},
  '--h-btn-txt-hover-default': {Light: '#fdf6e8', Dark: '#122733'},
  /* Button Ghost */
  '--h-btn-bg-ghost': {Light: '#6d597a', Dark: '#839395'},
  '--h-btn-txt-ghost': {Light: '#6d597a', Dark: '#839395'},
  '--h-btn-bg-hover-ghost': {Light: '#355070', Dark: '#c8cfd0'},
  '--h-btn-txt-hover-ghost': {Light: '#355070', Dark: '#c8cfd0'},
  /* Button Transparent */
  '--h-btn-bg-transparent': {Light: 'transparent', Dark: 'transparent'},
  '--h-btn-txt-transparent': {Light: '#6d597a', Dark: '#839395'},
  '--h-btn-bg-hover-transparent': {Light: '#355070', Dark: '#8A9B00'},
  '--h-btn-txt-hover-transparent': {Light: '#fdf6e8', Dark: '#122733'},
  /* Button Danger */
  '--h-btn-bg-danger': {Light: '#e56b6f', Dark: 'rgba(189, 59, 51, 0.35)'},
  '--h-btn-txt-danger': {Light: '#fffffc', Dark: '#BD3B33'},
  '--h-btn-bg-hover-danger': {Light: '#355070', Dark: '#BD3B33'},
  '--h-btn-txt-hover-danger': {Light: '#fdf6e8', Dark: '#122733'},
  /* Input */
  '--h-input-bg': {Light: '#fffffc', Dark: '#09141b'},
  '--h-input-bd': {Light: '#6d597a', Dark: '#112836'},
  '--h-input-txt': {Light: '#6d597a', Dark: '#c8cfd0'},
  /* Boxes */
  '--h-box-bg-default': {Light: '#ece2dc', Dark: 'rgb(26, 52, 65)'},
  '--h-box-txt-default': {Light: '#6d597a', Dark: '#839395'},
  '--h-box-bg-info': {Light: '#eaac8b', Dark: 'rgba(103, 114, 23, 0.35)'},
  '--h-box-txt-info': {Light: '#6d597a', Dark: '#8A9B00'},
  /* Media Box */
  '--h-box-bg-media': {Light: '#ece2dc', Dark: 'rgb(26, 52, 65)'},
  '--h-box-txt-media': {Light: '#6d597a', Dark: '#839395'},
  '--h-box-bg-hover-media': {Light: '#ece2dc', Dark: 'rgb(26, 52, 65)'},
  '--h-box-txt-hover-media': {Light: '#eaac8b', Dark: '#c8cfd0'},
  '--h-box-bg-media-image' : {Light: '#6d597a', Dark: '#2f3e46'},
  /* Media Box Colours */
  '--h-text-red' : {Light: '#e56b6f', Dark: '#BD3B33'},
  '--h-text-green': {Light: '#40916c', Dark: '#8A9B00'},
  '--h-text-blue': {Light: '#5390d9', Dark: '#5787D2'},
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

