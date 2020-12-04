import { combineReducers } from 'redux';
import BlocksReducer from './BlocksReducer';

const CombinedReducers = combineReducers({
  blocks: BlocksReducer,
});

export default CombinedReducers;
