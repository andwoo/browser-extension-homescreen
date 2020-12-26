import React from 'react';
import styled from 'styled-components';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import Button from '../styled/Button';
import * as StyleConstants from '../styled/StyleConstants';

interface SortContainerProps {
  children?: React.ReactNode,
  removeBlock: () => void;
  moveBlockUp: () => void;
  moveBlockDown: () => void;
}

const removeStyle: React.CSSProperties = {
  width: '1.4em',
  height: '1.4em',
};

const arrowUpStyle: React.CSSProperties = {
  width: '1.4em',
  height: '1.4em',
  borderTopLeftRadius: StyleConstants.Radii.extraSmall,
  borderTopRightRadius: StyleConstants.Radii.extraSmall,
};

const arrowDownStyle: React.CSSProperties = {
  width: '1.4em',
  height: '1.4em',
  borderBottomLeftRadius: StyleConstants.Radii.extraSmall,
  borderBottomRightRadius: StyleConstants.Radii.extraSmall,
};

const ButtonText = styled.div`
  position: 'relative',
  top: '50%',
  left: '0',
  transform: 'translate(0%, -50%)'
`;

const SortContainer = (props: SortContainerProps): JSX.Element => {
  return (
    <Layout>
      <LayoutItem size='full' style={{paddingRight: StyleConstants.Paddings.small}}>
        {props.children}
      </LayoutItem>
      <LayoutItem>
        <Layout direction="row" style={{fontSize: '1rem'}}>
          <LayoutItem>
            <Button color="red" radius="extraSmall" onClick={props.removeBlock} style={removeStyle}>
              <ButtonText>
                <i className="fas fa-times"></i>
              </ButtonText>
            </Button>
          </LayoutItem>
          <LayoutItem size="full">
            <div style={{width: StyleConstants.Paddings.small, height: StyleConstants.Paddings.small}}/>
          </LayoutItem>
          <LayoutItem>
            <Button color="grey" onClick={props.moveBlockUp} style={arrowUpStyle}>
              <ButtonText>
                <i className="fas fa-angle-up"></i>
              </ButtonText>
            </Button>
          </LayoutItem>
          <LayoutItem>
            <Button color="grey" onClick={props.moveBlockDown} style={arrowDownStyle}>
              <ButtonText>
                <i className="fas fa-angle-down"></i>
              </ButtonText>
            </Button>
          </LayoutItem>
        </Layout>
      </LayoutItem>
    </Layout>
  );
}
export default SortContainer
