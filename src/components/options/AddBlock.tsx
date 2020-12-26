import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import { Block } from '../../redux/interfaces/StoreModel';
import * as BlockActions from '../../redux/actions/BlockActions';
import BlockTypes from '../../constants/BlockTypes';
import Box from '../styled/Box';
import Button from '../styled/Button';
import * as StyleConstants from '../styled/StyleConstants'
import { dataToString as redditDataToString } from './RedditOptions';
import { dataToString as twitchDataToString } from './TwitchOptions';
import { dataToString as launcherDataToString } from './LauncherOptions';

const types = new Map();
types.set(BlockTypes.REDDIT, redditDataToString);
types.set(BlockTypes.TWITCH, twitchDataToString);
types.set(BlockTypes.LAUNCHER, launcherDataToString);

function MapStateToProps() { return { }; }
function MapDispatchToProps(dispatch) {
  const actionCreators = {
    addBlock: BlockActions.addBlock
  };
  return bindActionCreators(actionCreators, dispatch);
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: StyleConstants.Radii.extraSmall,
  border: '1px solid rgba(0, 0, 0, 0.1)'
}

const AddBlock = ({addBlock}: {addBlock: (block: Block, dataToString: () => string) => BlockActions.BlockUpdateAction}): JSX.Element => {
  const keys = Array.from(types.keys());
  const [selected, setSelection] = useState(keys[0]);
  const handleOnAddBlock = (): void => {
    addBlock({
      id: Date.now().toString(),
      type: selected
    },
    types.get(selected));
  }

  return (
    <Box radius="medium" border padding="small" color="white">
      <Layout>
        <LayoutItem size="full" stretch>
          <select
            id="types"
            style={selectStyle}
            value={selected}
            onChange={(event): void => setSelection(event.target.value)}
          >
            {keys.map((type, index) => <option key={index} value={type}>{type}</option>)}
          </select>
        </LayoutItem>
        <LayoutItem size="full" style={{marginLeft: StyleConstants.Paddings.small}}>
          <Button color="green" padding="small" radius="extraSmall" onClick={handleOnAddBlock}>
            <i className="fas fa-plus"></i>
          </Button>
        </LayoutItem>
      </Layout>
    </Box>
  );
}
export default connect(MapStateToProps, MapDispatchToProps)(AddBlock);
