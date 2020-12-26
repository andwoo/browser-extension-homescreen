import React from 'react';
import styled from 'styled-components';
import * as StyleConstants from './StyleConstants';

interface ButtonProps {
  radius?: StyleConstants.RadiiKeys;
  color?: StyleConstants.ColorKeys;
  border?: boolean;
  borderColor?: StyleConstants.ColorKeys;
  padding?: StyleConstants.PaddingsKeys;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick: () => void;
}

const ButtonHover = styled.div`
  cursor: pointer;
  text-align: center;
  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(80%);
  }
`;

const Button = ({radius, color, border, borderColor, padding, children, style, onClick}: ButtonProps): JSX.Element => {
  const combinedStyle: React.CSSProperties = Object.assign({
    borderRadius: StyleConstants.Radii[radius] ?? '0px',
    backgroundColor: StyleConstants.Colors[color] ?? '',
    padding: StyleConstants.Paddings[padding] ?? '0px',
    border: border ? `1px solid ${StyleConstants.Colors[borderColor]}` : ''
  }, style ?? {});

  return (
    <ButtonHover style={combinedStyle} onClick={onClick}>
      {children}
    </ButtonHover>
  );
}

export default Button;
