import { combineReducers } from 'redux';
import RedditReducer from './RedditReducer';

const CombinedReducers = combineReducers({
  reddit: RedditReducer,
});

export default CombinedReducers;
