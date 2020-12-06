import React, { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import * as BlockActions from '../../redux/actions/BlockActions';
import { Block } from '../../redux/interfaces/StoreModel';
import BlockTypes from '../../constants/BlockTypes';
import RedditOptions from './RedditOptions';
import OptionButton from './OptionButton';

const containerStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 10,
  marginBottom: '1rem',
  boxShadow: '0px 0px 12px 3px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(0, 0, 0, 0.06)'
};

const buttonStyle: React.CSSProperties = {
  margin: 4,
  marginBottom: 0,
  width: '1.4em',
  height: '1.4em',
};

const textStyle: React.CSSProperties = {
  position: 'relative',
  top: '50%',
  left: '0',
  transform: 'translate(0%, -50%)'
};

function MapStateToProps() {
  return {
  };
}

function MapDispatchToProps(dispatch) {
  const actionCreators = {
    updateBlock: BlockActions.updateBlock,
    moveBlockUp: BlockActions.moveBlockUp,
    moveBlockDown: BlockActions.moveBlockDown,
    removeBlock: BlockActions.removeBlock,
  };
  return bindActionCreators(actionCreators, dispatch);
}

interface BlockContainerProps {
  index: number;
  block: Block;
  updateBlock: (block: Block, dataToString: () => string) => void;
  moveBlockUp: (block: Block) => void;
  moveBlockDown: (block: Block) => void;
  removeBlock: (block: Block) => void;
}

interface BlockOption {
  dataToString: () => string;
}

function getBlockOptionComponent(ref, block: Block):JSX.Element {
  switch(block.type) {
    case BlockTypes.REDDIT: {
      return <RedditOptions key={block.id} ref={ref} block={block}/>;
    }
  }
  return null;
}

const BlockContainer = (props: BlockContainerProps): JSX.Element => {
  const option = useRef();
  const block = props.block;
  const saveChanges = (): void => {
    const optionB: BlockOption = (option.current as BlockOption);
    props.updateBlock(block, optionB?.dataToString);
  }
  return (
    <Layout style={containerStyle}>
      <LayoutItem size='full' style={{padding: 10}}>
        {getBlockOptionComponent(option, block)}
        <OptionButton variant="default" onClick={saveChanges} style={{marginTop: '0.5rem', padding: 10}}>Save</OptionButton>
      </LayoutItem>
      <LayoutItem>
        <Layout direction="row" style={{fontSize: '1rem'}}>
          <LayoutItem>
            <OptionButton variant="error" onClick={(): void => props.removeBlock(block)} style={buttonStyle}>
              <div style={textStyle}>
                <i className="fas fa-times"></i>
              </div>
            </OptionButton>
          </LayoutItem>
          <LayoutItem size="full">
            <div style={{width: '0.75em', height: '0.75em'}}/>
          </LayoutItem>
          <LayoutItem>
            <OptionButton variant="default" onClick={(): void => props.moveBlockUp(block)} style={buttonStyle}>
              <div style={textStyle}>
                <i className="fas fa-angle-up"></i>
              </div>
            </OptionButton>
          </LayoutItem>
          <LayoutItem>
            <OptionButton variant="default" onClick={(): void => props.moveBlockDown(block)} style={buttonStyle}>
              <div style={textStyle}>
                <i className="fas fa-angle-down"></i>
              </div>
            </OptionButton>
          </LayoutItem>
        </Layout>
      </LayoutItem>
    </Layout>
  );
}

export default connect(MapStateToProps, MapDispatchToProps)(BlockContainer);
