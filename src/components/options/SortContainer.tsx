import React from 'react';
import styled from 'styled-components';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import OptionButton from './OptionButton';

interface SortContainerProps {
  children?: React.ReactNode,
  removeBlock: () => void;
  moveBlockUp: () => void;
  moveBlockDown: () => void;
}

const buttonStyle: React.CSSProperties = {
  margin: 4,
  marginBottom: 0,
  width: '1.4em',
  height: '1.4em',
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
      <LayoutItem size='full' style={{padding: 10, paddingRight: 5}}>
        {props.children}
      </LayoutItem>
      <LayoutItem>
        <Layout direction="row" style={{fontSize: '1rem'}}>
          <LayoutItem>
            <OptionButton variant="error" onClick={props.removeBlock} style={buttonStyle}>
              <ButtonText>
                <i className="fas fa-times"></i>
              </ButtonText>
            </OptionButton>
          </LayoutItem>
          <LayoutItem size="full">
            <div style={{width: '0.75em', height: '0.75em'}}/>
          </LayoutItem>
          <LayoutItem>
            <OptionButton variant="default" onClick={props.moveBlockUp} style={buttonStyle}>
              <ButtonText>
                <i className="fas fa-angle-up"></i>
              </ButtonText>
            </OptionButton>
          </LayoutItem>
          <LayoutItem>
            <OptionButton variant="default" onClick={props.moveBlockDown} style={buttonStyle}>
              <ButtonText>
                <i className="fas fa-angle-down"></i>
              </ButtonText>
            </OptionButton>
          </LayoutItem>
        </Layout>
      </LayoutItem>
    </Layout>
  );
}
export default SortContainer
