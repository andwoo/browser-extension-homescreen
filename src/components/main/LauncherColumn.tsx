import React, { useEffect } from 'react';
import styled from 'styled-components';
import SimpleBar from 'simplebar-react';
import { BlockColumnProps } from './BlockColumn';
import { LauncherOptionsState, LauncherOptionItem } from '../options/LauncherOptions';
import Box from '../styled/Box';
import { Layout } from '@andwoo/scss-grid';

const LauncherColumn = ({ block, setLoading, setSuccess }: BlockColumnProps): JSX.Element => {
  useEffect(() => {
    setSuccess(true);
    setLoading(false);
  }, []);

  const icons: LauncherOptionItem[] = (JSON.parse(block.data) as LauncherOptionsState).icons;

  return (
    <SimpleBar autoHide={true} style={{width: '3rem', height: '100%'}}>
      <Layout direction="row" style={{alignItems: 'center'}}>
        {icons.map((icon: LauncherOptionItem, index: number) => {
          return (
            <Icon key={index} {...icon}/>
          )})
      }
      </Layout>
    </SimpleBar>
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
