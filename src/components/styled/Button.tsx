import React from 'react';
import styled from 'styled-components';
import * as StyleConstants from './StyleConstants';

interface ButtonProps {
  radius?: StyleConstants.RadiiKeys;
  color?: StyleConstants.ColorKeys;
  padding?: StyleConstants.PaddingsKeys;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick: () => void;
}

const ButtonHover = styled.div`
  cursor: pointer;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.25);
    filter: brightness(95%);
  }
  &:active {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    filter: brightness(85%);
  }
`;

const Button = ({radius, color, padding, children, style, onClick}: ButtonProps): JSX.Element => {
  const combinedStyle: React.CSSProperties = Object.assign({
    borderRadius: StyleConstants.Radii[radius] ?? '0px',
    backgroundColor: StyleConstants.Colors[color] ?? '',
    padding: StyleConstants.Paddings[padding] ?? '0px'
  }, style ?? {});

  return (
    <ButtonHover style={combinedStyle} onClick={onClick}>
      {children}
    </ButtonHover>
  );
}

export default Button;
