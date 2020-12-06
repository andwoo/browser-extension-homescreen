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

const Options = ({blocks, addBlocks, addBlock}: {blocks: Array<Block>, addBlocks: (blocks: Array<Block>) => BlockActions.BlocksAction, addBlock: (block: Block) => BlockActions.BlockAction}): JSX.Element => {
  useLoadStateFromStorage(addBlocks);
  return (
    <Layout direction="column">
      <LayoutItem size="one-fifth" style={{padding: '1rem'}}>
        <DebugPanel/>
      </LayoutItem>
      <LayoutItem size="four-fifths" style={{padding: '1rem', paddingLeft: '0rem'}}>
        {blocks.map((block, index) => <BlockContainer key={index} index={index} block={block}/>)}
        <div style={{width: 200, height: 100, backgroundColor: 'cyab'}} onClick={():void => {
          addBlock({
            id: Date.now().toString(),
            type: BlockTypes.REDDIT
          });
        }}>Add</div>
      </LayoutItem>
    </Layout>
  );
}

const ReduxPropsBinder = connect(MapStateToProps, MapDispatchToProps)(Options);
export default hot(module)(ReduxPropsBinder);
