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
  color?: StyleConstants.ColorKeys;
  border?: boolean;
  borderColor?: StyleConstants.ColorKeys;
  padding?: StyleConstants.PaddingsKeys;
  children?: React.ReactNode;
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

export const SuccessBox = (props: ExtendedBoxProps): JSX.Element => {
  return (
    <Box
      radius="extraSmall"
      border
      borderColor="lightGreen"
      padding="small"
      color="green"
      {...props}
      style={{color: StyleConstants.Colors.greenText, ...props.style}}
    />
  );
}

export const ErrorBox = (props: ExtendedBoxProps): JSX.Element => {
  return (
    <Box
      radius="extraSmall"
      border
      borderColor="lightRed"
      padding="small"
      color="red"
      {...props}
      style={{color: StyleConstants.Colors.redText, ...props.style}}
    />
  );
}

export const WarningBox = (props: ExtendedBoxProps): JSX.Element => {
  return (
    <Box
      radius="extraSmall"
      border
      borderColor="lightYellow"
      padding="small"
      color="yellow"
      {...props}
      style={{color: StyleConstants.Colors.yellowText, ...props.style}}
    />
  );
}

export const InfoBox = (props: ExtendedBoxProps): JSX.Element => {
  return (
    <Box
      radius="extraSmall"
      border
      borderColor="lightBlue"
      padding="small"
      color="blue"
      {...props}
      style={{color: StyleConstants.Colors.blueText, ...props.style}}
    />
  );
}

export const PurpleBox = (props: ExtendedBoxProps): JSX.Element => {
  return (
    <Box
      radius="extraSmall"
      border
      borderColor="lightPurple"
      padding="small"
      color="purple"
      {...props}
      style={{color: StyleConstants.Colors.purpleText, ...props.style}}
    />
  );
}

export const PinkBox = (props: ExtendedBoxProps): JSX.Element => {
  return (
    <Box
      radius="extraSmall"
      border
      borderColor="lightPink"
      padding="small"
      color="pink"
      {...props}
      style={{color: StyleConstants.Colors.pinkText, ...props.style}}
    />
  );
}

export default Box;
