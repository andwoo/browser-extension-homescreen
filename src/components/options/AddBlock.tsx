import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import { Block } from '../../redux/interfaces/StoreModel';
import * as BlockActions from '../../redux/actions/BlockActions';
import BlockTypes from '../../constants/BlockTypes';
import OptionButton from './OptionButton';
import { dataToString as redditDataToString } from './RedditOptions';

const types = new Map();
types.set(BlockTypes.REDDIT, redditDataToString);

const addButtonStyle: React.CSSProperties = {
  padding: 10
}

function MapStateToProps() { return { }; }
function MapDispatchToProps(dispatch) {
  const actionCreators = {
    addBlock: BlockActions.addBlock
  };
  return bindActionCreators(actionCreators, dispatch);
}

const AddBlock = ({addBlock}: {addBlock: (block: Block, dataToString: () => string) => BlockActions.BlockUpdateAction}): JSX.Element => {
  const keys = Array.from(types.keys());
  const [selected, setSelection] = useState(keys[0]);
  const testAdd = (): void => {
    addBlock({
      id: Date.now().toString(),
      type: selected
    },
    types.get(selected));
  }

  return (
    <Layout>
      <LayoutItem size="full">
        <select
          id="types"
          style={{width: '100%', height: '2rem'}}
          value={selected}
          onChange={(event): void => setSelection(event.target.value)}
        >
          {keys.map((type, index) => <option key={index} value={type}>{type}</option>)}
        </select>
      </LayoutItem>
      <LayoutItem size="full">
        <OptionButton variant="success" onClick={testAdd} style={addButtonStyle} >
          <i className="fas fa-plus"></i>
        </OptionButton>
      </LayoutItem>
    </Layout>
  );
}
export default connect(MapStateToProps, MapDispatchToProps)(AddBlock);
