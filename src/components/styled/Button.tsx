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
  transition: filter 0.15s;
  &:hover {
    filter: brightness(160%);
  }
  &:active {
    filter: brightness(160%);
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


interface ExtendedButtonProps {
  label?: string;
  icon?: string;
  color?: StyleConstants.ColorKeys;
  padding?: StyleConstants.PaddingsKeys;
  border?: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
}

export const TransparentButton = (props: ExtendedButtonProps): JSX.Element => {
  return <Button
    border
    borderColor="lightGrey"
    padding="small"
    {...props}
    radius="extraSmall">
      {props.icon && <i className={props.icon} style={{color: StyleConstants.Colors.greyText}}/>}
      {props.icon && props.label && <div style={{display: 'inline-block', width: StyleConstants.Paddings.small}}/>}
      {props.label && <strong style={{color: StyleConstants.Colors.greyText}}>{props.label}</strong>}
    </Button>;
}

export const GreyButton = (props: ExtendedButtonProps): JSX.Element => {
  return <Button
    color="button"
    border
    borderColor="lightGrey"
    padding="small"
    {...props}
    radius="extraSmall">
      {props.icon && <i className={props.icon} style={{color: StyleConstants.Colors.greyText}}/>}
      {props.icon && props.label && <div style={{display: 'inline-block', width: StyleConstants.Paddings.small}}/>}
      {props.label && <strong style={{color: StyleConstants.Colors.greyText}}>{props.label}</strong>}
    </Button>;
}

export const SuccessButton = (props: ExtendedButtonProps): JSX.Element => {
  return <Button
    color="button"
    border
    borderColor="lightGreen"
    padding="small"
    {...props}
    radius="extraSmall"
    >
      {props.icon && <i className={props.icon} style={{color: StyleConstants.Colors.greenText}}/>}
      {props.icon && props.label && <div style={{display: 'inline-block', width: StyleConstants.Paddings.small}}/>}
      {props.label && <strong style={{color: StyleConstants.Colors.greenText}}>{props.label}</strong>}
    </Button>;
}

export const ErrorButton = (props: ExtendedButtonProps): JSX.Element => {
  return <Button
    color="button"
    border
    borderColor="lightRed"
    padding="small"
    {...props}
    radius="extraSmall">
      {props.icon && <i className={props.icon} style={{color: StyleConstants.Colors.redText}}/>}
      {props.icon && props.label && <div style={{display: 'inline-block', width: StyleConstants.Paddings.small}}/>}
      {props.label && <strong style={{color: StyleConstants.Colors.redText}}>{props.label}</strong>}
    </Button>;
}


export const WarningButton = (props: ExtendedButtonProps): JSX.Element => {
  return <Button
    color="button"
    border
    borderColor="lightYellow"
    padding="small"
    {...props}
    radius="extraSmall">
      {props.icon && <i className={props.icon} style={{color: StyleConstants.Colors.yellowText}}/>}
      {props.icon && props.label && <div style={{display: 'inline-block', width: StyleConstants.Paddings.small}}/>}
      {props.label && <strong style={{color: StyleConstants.Colors.yellowText}}>{props.label}</strong>}
    </Button>;
}

export const InfoButton = (props: ExtendedButtonProps): JSX.Element => {
  return <Button
    color="button"
    border
    borderColor="lightBlue"
    padding="small"
    {...props}
    radius="extraSmall">
      {props.icon && <i className={props.icon} style={{color: StyleConstants.Colors.blueText}}/>}
      {props.icon && props.label && <div style={{display: 'inline-block', width: StyleConstants.Paddings.small}}/>}
      {props.label && <strong style={{color: StyleConstants.Colors.blueText}}>{props.label}</strong>}
    </Button>;
}

export const PurpleButton = (props: ExtendedButtonProps): JSX.Element => {
  return <Button
    color="button"
    border
    borderColor="lightPurple"
    padding="small"
    {...props}
    radius="extraSmall">
      {props.icon && <i className={props.icon} style={{color: StyleConstants.Colors.purpleText}}/>}
      {props.icon && props.label && <div style={{display: 'inline-block', width: StyleConstants.Paddings.small}}/>}
      {props.label && <strong style={{color: StyleConstants.Colors.purpleText}}>{props.label}</strong>}
    </Button>;
}

export const PinkButton = (props: ExtendedButtonProps): JSX.Element => {
  return <Button
    color="button"
    border
    borderColor="lightPink"
    padding="small"
    {...props}
    radius="extraSmall">
      {props.icon && <i className={props.icon} style={{color: StyleConstants.Colors.pinkText}}/>}
      {props.icon && props.label && <div style={{display: 'inline-block', width: StyleConstants.Paddings.small}}/>}
      {props.label && <strong style={{color: StyleConstants.Colors.pinkText}}>{props.label}</strong>}
    </Button>;
}
