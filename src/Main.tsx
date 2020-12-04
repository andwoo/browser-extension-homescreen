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
    addBlocks: BlockActions.addBlocks
  };
  return bindActionCreators(actionCreators, dispatch);
}

const Main = ({blocks, addBlocks}: {blocks: Array<Block>, addBlocks: (blocks: Array<Block>) => BlockActions.BlocksAction}): JSX.Element => {
  const [inProgress, success] = useLoadStateFromStorage(addBlocks);
  return (
    <Layout direction="column">
      <LayoutItem size="full">{JSON.stringify(blocks)}</LayoutItem>
      <LayoutItem size="full"><h1>{`WIP Main inProgress[${inProgress}] success[${success}]`}</h1></LayoutItem>
    </Layout>
  );
}

const ReduxPropsBinder = connect(MapStateToProps, MapDispatchToProps)(Main);
export default hot(module)(ReduxPropsBinder);
