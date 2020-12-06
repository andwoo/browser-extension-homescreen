import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.25);
  }

  &:active {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

interface OptionButton {
  variant: 'default' | 'error' | 'success';
  onClick: () => void;
  style?: React.CSSProperties;
  children?: any;
}

const OptionButton = ({variant, onClick, style, children}: OptionButton): JSX.Element => {
  style = style ?? {};
  switch(variant) {
    case 'default':
      style.backgroundColor = '#e8e8e8';
      style.color = '#999999';
      break;
    case 'error':
      style.backgroundColor = '#ffc7c7';
      style.color = '#ab7373';
      break;
    case 'success':
      style.backgroundColor = '#d1ffd7';
      style.color = '#73a57a';
      break;

  }
  return <Button onClick={onClick} style={style}>{children}</Button>;
}
export default OptionButton;
