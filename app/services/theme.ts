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
  '--h-header-background': {Light: '#f1dcd1', Dark: '#09141b'},
  '--h-header-text': {Light: '#242537', Dark: '#839395'},
  /* Content */
  '--h-content-background': {Light: '#ffeee4', Dark: '#122733'},
  '--h-content-text': {Light: '#242537', Dark: '#839395'},
  /* Button Default */
  '--h-btn-bg-default': {Light: '#242537', Dark: 'rgba(138, 155, 0, 0.35)'},
  '--h-btn-txt-default': {Light: '#f3e8eb', Dark: '#8A9B00'},
  '--h-btn-bg-hover-default': {Light: '#53547f', Dark: '#8A9B00'},
  '--h-btn-txt-hover-default': {Light: '#f3e8eb', Dark: '#122733'},
  /* Button Ghost */
  '--h-btn-bg-ghost': {Light: '#242537', Dark: '#839395'},
  '--h-btn-txt-ghost': {Light: '#242537', Dark: '#839395'},
  '--h-btn-bg-hover-ghost': {Light: '#53547f', Dark: '#c8cfd0'},
  '--h-btn-txt-hover-ghost': {Light: '#53547f', Dark: '#c8cfd0'},
  /* Button Transparent */
  '--h-btn-bg-transparent': {Light: 'transparent', Dark: 'transparent'},
  '--h-btn-txt-transparent': {Light: '#242537', Dark: '#839395'},
  '--h-btn-bg-hover-transparent': {Light: '#53547f', Dark: '#8A9B00'},
  '--h-btn-txt-hover-transparent': {Light: '#f3e8eb', Dark: '#122733'},
  /* Button Danger */
  '--h-btn-bg-danger': {Light: '#fc6454', Dark: 'rgba(189, 59, 51, 0.35)'},
  '--h-btn-txt-danger': {Light: '#fffffc', Dark: '#BD3B33'},
  '--h-btn-bg-hover-danger': {Light: '#fa7869', Dark: '#BD3B33'},
  '--h-btn-txt-hover-danger': {Light: '#fffffc', Dark: '#122733'},
  /* Input */
  '--h-input-bg': {Light: '#f9f0eb', Dark: '#09141b'},
  '--h-input-bd': {Light: '#f9f0eb', Dark: '#112836'},
  '--h-input-txt': {Light: '#242537', Dark: '#c8cfd0'},
  /* Boxes */
  '--h-box-bg-default': {Light: '#f1dcd1', Dark: 'rgb(26, 52, 65)'},
  '--h-box-txt-default': {Light: '#242537', Dark: '#839395'},
  '--h-box-bg-info': {Light: '#e6ac9e', Dark: 'rgba(103, 114, 23, 0.35)'},
  '--h-box-txt-info': {Light: '#242537', Dark: '#8A9B00'},
  /* Media Box */
  '--h-box-bg-media': {Light: '#f1dcd1', Dark: 'rgb(26, 52, 65)'},
  '--h-box-txt-media': {Light: '#242537', Dark: '#839395'},
  '--h-box-bg-hover-media': {Light: '#f7eae4', Dark: 'rgb(26, 52, 65)'},
  '--h-box-txt-hover-media': {Light: '#242537', Dark: '#c8cfd0'},
  '--h-box-bg-media-image' : {Light: '#f7eae4', Dark: 'rgb(26, 52, 65)'},
  /* Media Box Colours */
  '--h-text-red' : {Light: '#fc6454', Dark: '#BD3B33'},
  '--h-text-green': {Light: '#df7ec8', Dark: '#8A9B00'},
  '--h-text-blue': {Light: '#5b6efb', Dark: '#5787D2'},
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

