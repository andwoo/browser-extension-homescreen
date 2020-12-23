import React, { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as BlockActions from '../../redux/actions/BlockActions';
import { Block } from '../../redux/interfaces/StoreModel';
import BlockTypes from '../../constants/BlockTypes';
import SortContainer from './SortContainer';
import RedditOptions from './RedditOptions';
import TwitchOptions from './TwitchOptions';
import LauncherOption from './LauncherOptions';
import OptionButton from './OptionButton';

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

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

function getBlockOptionComponent(ref, block: Block, save: () => void):JSX.Element {
  switch(block.type) {
    case BlockTypes.REDDIT: {
      return <RedditOptions key={block.id} ref={ref} block={block} save={save}/>;
    }
    case BlockTypes.TWITCH: {
      return <TwitchOptions key={block.id} ref={ref} block={block} save={save}/>;
    }
    case BlockTypes.LAUNCHER: {
      return <LauncherOption key={block.id} ref={ref} block={block} save={save}/>;
    }
  }
  return null;
}

const BlockContainer = (props: BlockContainerProps): JSX.Element => {
  const option = useRef();
  const { block } = props;
  const saveChanges = (): void => {
    const optionB: BlockOption = (option.current as BlockOption);
    props.updateBlock(block, optionB?.dataToString);
  }
  return (
    <Container>
      <SortContainer
        removeBlock={(): void => props.removeBlock(block)}
        moveBlockUp={(): void => props.moveBlockUp(block)}
        moveBlockDown={(): void => props.moveBlockDown(block)}
      >
        {getBlockOptionComponent(option, block, saveChanges)}
        <OptionButton variant="default" onClick={saveChanges} style={{marginTop: '0.5rem', padding: 10}}>Save</OptionButton>
      </SortContainer>
    </Container>
  );
}

export default connect(MapStateToProps, MapDispatchToProps)(BlockContainer);
