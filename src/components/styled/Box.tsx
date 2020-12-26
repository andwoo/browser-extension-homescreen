import React from 'react';
import * as StyleConstants from './StyleConstants';

interface BoxProps {
  radius?: StyleConstants.RadiiKeys;
  color?: StyleConstants.ColorKeys;
  border?: boolean;
  padding?: StyleConstants.PaddingsKeys;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Box = ({radius, color, border, padding, children, style}: BoxProps): JSX.Element => {
  const combinedStyle: React.CSSProperties = Object.assign({
    borderRadius: StyleConstants.Radii[radius] ?? '0px',
    backgroundColor: StyleConstants.Colors[color] ?? '',
    padding: StyleConstants.Paddings[padding] ?? '0px',
    border: border ? '1px solid rgba(0, 0, 0, 0.1)' : ''
  }, style ?? {});

  return (
    <div style={combinedStyle}>
      {children}
    </div>
  );
}

export default Box;
