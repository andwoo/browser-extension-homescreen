import React from 'react';
import styled from 'styled-components';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import Box, { GreyBox } from '../styled/Box';
import * as StyleConstants from '../styled/StyleConstants';

interface MediaTileProps {
  thumbnail: string;
  thumbnailFallbackIcon: string;
  thumbnailHref: string;
  href: string;
  children: React.ReactNode,
  //box style
  color?: StyleConstants.ColorKeys;
  radius?: StyleConstants.RadiiKeys;
  border?: boolean;
  borderColor?: StyleConstants.ColorKeys;
  padding?: StyleConstants.PaddingsKeys;
  style?: React.CSSProperties;
}

const Href = styled.a`
  text-decoration: none;
  color: inherit;

  transition: filter 0.15s;
  &:hover {
    filter: brightness(160%);
  }
  &:active {
    filter: brightness(160%);
  }
`;

const MediaTile = (props: MediaTileProps): JSX.Element => {
  const Image = styled.div`
    background: url(${props.thumbnail});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 3rem;
    height: 3rem;
    border-radius: ${StyleConstants.Radii.small};
  `;

  return (
    <GreyBox
      {...props}
      style={{marginBottom: StyleConstants.Paddings.small, ...props.style}}
    >
      <Layout>
        <LayoutItem>
          <Href href={props.thumbnailHref}>
            <Box radius="small" border borderColor={props.borderColor} padding="none" color={props.thumbnail ? 'background': 'none'} style={{display: 'flex', width: '3rem', height: '3rem', justifyContent: 'center', alignItems: 'center'}}>
              {props.thumbnail && <Image/>}
              {!props.thumbnail && <i className={props.thumbnailFallbackIcon} style={{fontSize: '2rem'}}/>}
            </Box>
          </Href>
        </LayoutItem>
        <LayoutItem size="full">
          <Href href={props.href}>
            <div style={{marginLeft: StyleConstants.Paddings.small}}>
              {props.children}
            </div>
          </Href>
        </LayoutItem>
      </Layout>
    </GreyBox>
  );
}

export default MediaTile;
