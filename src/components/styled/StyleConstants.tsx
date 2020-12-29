export const Radii = {
  extraSmall: '0.25rem',
  small: '0.5rem',
  medium: '1rem',
  large: '1.5rem'
}
export type RadiiKeys = keyof typeof Radii;

export const Colors = {
  none: 'transparent',
  button: '#182C34',
  background: '#122733',

  greyText: '#849496',
  grey: '#1A3441',
  lightGrey: '#849496',

  yellowText: '#677217',
  lightYellow: 'rgba(103, 114, 23, 0.35)',

  redText: '#BD3B33',
  lightRed: 'rgba(189, 59, 51, 0.35)',

  greenText: '#8A9B00',
  lightGreen: 'rgba(138, 155, 0, 0.35)',

  blueText: '#5787D2',
  lightBlue: 'rgba(87, 135, 210, 0.35)',

  purpleText: '#6E6AC7',
  lightPurple: 'rgba(110, 106, 199, 0.35)',

  pinkText: '#B63A83',
  lightPink: 'rgba(182, 58, 131, 0.35)'
}
export type ColorKeys = keyof typeof Colors;

export const Paddings = {
  none: '0px',
  small: '0.5rem',
  medium: '1rem',
  large: '1.5rem'
}
export type PaddingsKeys = keyof typeof Paddings;

export const darkenedTextColor = 'rgba(0,0,0,0.7)';
