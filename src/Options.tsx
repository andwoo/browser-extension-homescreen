import React from 'react';
import { hot } from 'react-hot-loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import StoreModel, { Block } from './redux/interfaces/StoreModel';
import * as BlockActions from './redux/actions/BlockActions';
import { useLoadStateFromStorage } from './redux/hooks';
import BlockContainer from './components/options/BlockContainer';
import DebugPanel from './components/options/DebugPanel'
import BlockTypes from './constants/BlockTypes';
import OptionButton from './components/options/OptionButton';

function MapStateToProps(state: StoreModel) {
  return {
    blocks: state.blocks,
  };
}

function MapDispatchToProps(dispatch) {
  const actionCreators = {
    addBlocks: BlockActions.addBlocks,
    addBlock: BlockActions.addBlock
  };
  return bindActionCreators(actionCreators, dispatch);
}

const addButtonStyle: React.CSSProperties = {
  padding: 10
}

const Options = ({blocks, addBlocks, addBlock}: {blocks: Array<Block>, addBlocks: (blocks: Array<Block>) => BlockActions.BlocksAction, addBlock: (block: Block) => BlockActions.BlockAction}): JSX.Element => {
  useLoadStateFromStorage(addBlocks);
  return (
    <Layout direction="column">
      <LayoutItem size="one-fifth" style={{padding: '1rem'}}>
        <DebugPanel/>
      </LayoutItem>
      <LayoutItem size="four-fifths" style={{padding: '1rem', paddingLeft: '0rem'}}>
        {blocks.map((block, index) => <BlockContainer key={index} index={index} block={block}/>)}
        <OptionButton variant="success" onClick={():void => {addBlock({id: Date.now().toString(),type: BlockTypes.REDDIT});}} style={addButtonStyle} >
          <i className="fas fa-plus"></i>
        </OptionButton>
      </LayoutItem>
    </Layout>
  );
}

const ReduxPropsBinder = connect(MapStateToProps, MapDispatchToProps)(Options);
export default hot(module)(ReduxPropsBinder);
