import React from 'react';
import { connect } from 'react-redux';
import StoreModel, { Block } from '../../redux/interfaces/StoreModel';
import { TransparentBox, GreyBox } from '../styled/Box';

function MapStateToProps(state: StoreModel) {
  return {
    blocks: state.blocks,
  };
}

const DebugPanel = ({blocks}: {blocks: Array<Block>}): JSX.Element => {
  return (
    <TransparentBox>
      <GreyBox style={{maxWidth: '50vw', overflow: 'auto'}}>
        <code style={{fontWeight: 'bold'}}>
          <pre>
            {JSON.stringify(blocks, null, 2)}
          </pre>
        </code>
      </GreyBox>
    </TransparentBox>
  );
}

export default connect(MapStateToProps)(DebugPanel);
