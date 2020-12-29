import React from 'react';
import { hot } from 'react-hot-loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import StoreModel, { Block } from './redux/interfaces/StoreModel';
import * as BlockActions from './redux/actions/BlockActions';
import { useLoadStateFromStorage } from './redux/hooks';
import Loading from './components/main/Loading';
import * as StyleConstants from './components/styled/StyleConstants';
import BlockTypes from './constants/BlockTypes';
import WarningDialog from './components/main/WarningDialog';
import BlockColumn from './components/main/BlockColumn';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const sizes = new Map();
sizes.set(BlockTypes.LAUNCHER, '');

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
    <Layout direction="column" style={{padding: StyleConstants.Paddings.small, width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'ceter'}}>
      {inProgress &&
        <LayoutItem>
          <Loading loading={inProgress} success={success}/>
        </LayoutItem>
      }
      {!inProgress && !success &&
        <LayoutItem size="one-third">
          <WarningDialog
            title="Warning"
            message="Please ensure valid options have been set."
          />
        </LayoutItem>
      }
      {!inProgress && success && (
        <>
          {blocks.map((block, index) => {
            return (
              //@ts-ignore
              <LayoutItem key={index} stretch size={sizes.has(block.type) ? sizes.get(block.type) : 'full'} style={{paddingLeft: index === 0 ? '0px' : StyleConstants.Paddings.small}}>
                <BlockColumn block={block}/>
              </LayoutItem>
            );
          })}
        </>
      )}
    </Layout>
  );
}
const ReduxPropsBinder = connect(MapStateToProps, MapDispatchToProps)(Main);
export default hot(module)(ReduxPropsBinder);
