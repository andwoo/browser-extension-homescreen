import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BlockColumnProps } from './BlockColumn';
import { LauncherOptionsState, LauncherOptionItem } from '../options/LauncherOptions';
import Box from '../styled/Box';
import * as StyleConstants from '../styled/StyleConstants';
import { Layout } from '@andwoo/scss-grid';

const LauncherColumn = ({ block, setLoading, setSuccess }: BlockColumnProps): JSX.Element => {
  useEffect(() => {
    setSuccess(true);
    setLoading(false);
  }, []);

  const icons: LauncherOptionItem[] = (JSON.parse(block.data) as LauncherOptionsState).icons;

  return (
    <Box padding="none" border={false} style={{height: '100%', overflow: 'auto'}}>
      <Layout direction="row" style={{alignItems: 'center'}}>
        {icons.map((icon: LauncherOptionItem, index: number) => {
          return (
            <Icon key={index} {...icon}/>
          )})
      }
      </Layout>
    </Box>
  );
}

export default LauncherColumn;

const Href = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  text-align: center;
  font-size: 1.5rem;
  transition: filter 0.15s;
  &:hover {
    filter: brightness(160%);
  }
  &:active {
    filter: brightness(160%);
  }
`;
const Icon = (icon: LauncherOptionItem): JSX.Element => {
  return (
    <Box padding="small">
      <Href href={icon.href}>
        <i className={icon.icon}/>
      </Href>
    </Box>
  );
}
