import React from 'react';
import { connect } from 'react-redux';
import StoreModel, { Block } from '../../redux/interfaces/StoreModel';

function MapStateToProps(state: StoreModel) {
  return {
    blocks: state.blocks,
  };
}

const style: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 10,
  boxShadow: '0px 0px 12px 3px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(0, 0, 0, 0.06)'
};

const innerStyle: React.CSSProperties = {
  backgroundColor: '#f7f7f7',
  borderRadius: 5,
  margin: 10,
  padding: 10,
  border: '1px solid rgba(0, 0, 0, 0.1)'
};

const DebugPanel = ({blocks}: {blocks: Array<Block>}): JSX.Element => {
  return (
    <div style={style}>
      <div style={innerStyle}>
        <code style={{fontWeight: 'bold'}}>
          <pre>
            {JSON.stringify(blocks, null, 2)}
          </pre>
        </code>
      </div>
    </div>
  );
}

export default connect(MapStateToProps)(DebugPanel);
