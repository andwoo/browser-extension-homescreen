import React from 'react';
import { connect } from 'react-redux';
import StoreModel, { Block } from '../../redux/interfaces/StoreModel';
import Box from '../styled/Box';

function MapStateToProps(state: StoreModel) {
  return {
    blocks: state.blocks,
  };
}

const DebugPanel = ({blocks}: {blocks: Array<Block>}): JSX.Element => {
  return (
    <Box radius="medium" color="white" border padding="small">
      <Box radius="small" color="grey" border style={{maxWidth: '50vw', overflow: 'auto'}}>
        <code style={{fontWeight: 'bold'}}>
          <pre>
            {JSON.stringify(blocks, null, 2)}
          </pre>
        </code>
      </Box>
    </Box>
  );
}

export default connect(MapStateToProps)(DebugPanel);
