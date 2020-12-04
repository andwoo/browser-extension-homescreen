import React from 'react';
import { hot } from 'react-hot-loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import StoreModel, { Block } from './redux/interfaces/StoreModel';
import * as BlockActions from './redux/actions/BlockActions';
import { useLoadStateFromStorage } from './redux/hooks';

function MapStateToProps(state: StoreModel) {
  return {
    blocks: state.blocks,
  };
}

function MapDispatchToProps(dispatch) {
  const actionCreators = {
    addBlocks: BlockActions.addBlocks,
    addBlock: BlockActions.addBlock,
    // updateBlock: BlockActions.updateBlock,
    // moveBlock: BlockActions.moveBlock,
    // removeBlock: BlockActions.removeBlock,
  };
  return bindActionCreators(actionCreators, dispatch);
}

const Options = ({blocks, addBlocks, addBlock}: {blocks: Array<Block>, addBlocks: (blocks: Array<Block>) => BlockActions.BlocksAction, addBlock: (block: Block) => BlockActions.BlockAction}): JSX.Element => {
  useLoadStateFromStorage(addBlocks);
  return (
    <Layout direction="column">
      <LayoutItem size="full">{JSON.stringify(blocks)}</LayoutItem>
      <LayoutItem size="full">
        <h1>WIP Options</h1>
        <div style={{width: 200, height: 100, backgroundColor: 'cyab'}} onClick={():void => {
          addBlock({
            id: Date.now().toString(),
            type: "banana"
          });
        }}>Add</div>
      </LayoutItem>
    </Layout>
  );
}

const ReduxPropsBinder = connect(MapStateToProps, MapDispatchToProps)(Options);
export default hot(module)(ReduxPropsBinder);
