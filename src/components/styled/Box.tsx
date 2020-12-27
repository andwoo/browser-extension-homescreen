import React from 'react';
import * as StyleConstants from './StyleConstants';

interface BoxProps {
  radius?: StyleConstants.RadiiKeys;
  color?: StyleConstants.ColorKeys;
  border?: boolean;
  borderColor?: StyleConstants.ColorKeys;
  padding?: StyleConstants.PaddingsKeys;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Box = ({radius, color, border, borderColor, padding, children, style}: BoxProps): JSX.Element => {
  const combinedStyle: React.CSSProperties = Object.assign({
    borderRadius: StyleConstants.Radii[radius] ?? '0px',
    backgroundColor: StyleConstants.Colors[color] ?? '',
    padding: StyleConstants.Paddings[padding] ?? '0px',
    border: border ? `1px solid ${StyleConstants.Colors[borderColor]}` : ''
  }, style ?? {});

  return (
    <div style={combinedStyle}>
      {children}
    </div>
  );
}


interface ExtendedBoxProps {
  children?: React.ReactNode;
  border?: boolean;
  style?: React.CSSProperties;
}

export const TransparentBox = (props: ExtendedBoxProps): JSX.Element => {
  return (
    <Box
      radius="extraSmall"
      border
      borderColor="darkGrey"
      padding="small"
      {...props}
    />
  );
}

export const GreyBox = (props: ExtendedBoxProps): JSX.Element => {
  return (
    <Box
      radius="extraSmall"
      border
      borderColor="darkGrey"
      padding="small"
      color="black"
      {...props}
    />
  );
}

export default Box;