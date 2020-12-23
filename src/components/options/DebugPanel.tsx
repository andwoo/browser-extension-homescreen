import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import StoreModel, { Block } from '../../redux/interfaces/StoreModel';

function MapStateToProps(state: StoreModel) {
  return {
    blocks: state.blocks,
  };
}

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.06);
  max-width: 50vw;
  overflow: auto;
`;
const InnerContainer = styled.div`
  background-color: #f7f7f7;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const Code = styled.code`
  font-weight: bold;
`;

const DebugPanel = ({blocks}: {blocks: Array<Block>}): JSX.Element => {
  return (
    <Container>
      <InnerContainer>
        <Code>
          <pre>
            {JSON.stringify(blocks, null, 2)}
          </pre>
        </Code>
      </InnerContainer>
    </Container>
  );
}

export default connect(MapStateToProps)(DebugPanel);
