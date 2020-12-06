import React, { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import * as BlockActions from '../../redux/actions/BlockActions';
import { Block } from '../../redux/interfaces/StoreModel';
import BlockTypes from '../../constants/BlockTypes';
import RedditOptions from './RedditOptions';

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

const style: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: 10,
  marginBottom: '1rem',
  boxShadow: '0px 0px 12px 3px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(0, 0, 0, 0.06)'
};

function getBlockOptionComponent(ref, block: Block):JSX.Element {
  switch(block.type) {
    case BlockTypes.REDDIT: {
      return <RedditOptions key={block.id} ref={ref} block={block}/>;
    }
  }
  return null;
}

const BlockContainer = (props: BlockContainerProps): JSX.Element => {
  const option = useRef();
  const block = props.block;
  return (
    <Layout style={style}>
      <LayoutItem size='full' style={{padding: 10}}>
        {getBlockOptionComponent(option, block)}
        <div onClick={(): void => {
          const optionB: BlockOption = (option.current as BlockOption);
          props.updateBlock(block, optionB?.dataToString);
        }}>Save</div>
      </LayoutItem>
      <LayoutItem>
        <Layout direction="row" style={{fontSize: '1rem'}}>
          <LayoutItem>
            <ActionButton onClick={(): void => props.removeBlock(block)} backgroundColor="#ffc7c7">
              <i className="fas fa-times"></i>
            </ActionButton>
          </LayoutItem>
          <LayoutItem size="full">
            <div style={{width: '0.75em', height: '0.75em'}}/>
          </LayoutItem>
          <LayoutItem>
            <ActionButton onClick={(): void => props.moveBlockUp(block)}>
              <i className="fas fa-angle-up"></i>
            </ActionButton>
          </LayoutItem>
          <LayoutItem>
            <ActionButton onClick={(): void => props.moveBlockDown(block)}>
            <i className="fas fa-angle-down"></i>
            </ActionButton>
          </LayoutItem>
        </Layout>
      </LayoutItem>
    </Layout>
  );
}

const actionButtonStyle: React.CSSProperties = {
  backgroundColor: '#e8e8e8',
  borderRadius: 5,
  margin: 4,
  marginBottom: 0,
  width: '1.4em',
  height: '1.4em',
  cursor: 'pointer',
  textAlign: 'center',
};
const ActionButton = ({onClick, backgroundColor, children}: {onClick: () => void, backgroundColor?:string, children: any}): JSX.Element => {
  return (
    <LayoutItem>
      <div onClick={onClick} style={{...actionButtonStyle, backgroundColor: backgroundColor ?? '#e8e8e8'}}>
        <div style={{position: 'relative', top: '50%', left: '0', transform: 'translate(0%, -50%)'}}>
        {children}
        </div>
      </div>
    </LayoutItem>
  );
}

export default connect(MapStateToProps, MapDispatchToProps)(BlockContainer);
