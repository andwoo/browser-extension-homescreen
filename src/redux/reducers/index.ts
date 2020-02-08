import { combineReducers } from 'redux';
import OptionsReducer from './OptionsReducer';
import TwitchLiveStreamReducer from './TwitchLiveStreamReducer';
import RedditReducer from './RedditReducer';

const CombinedReducers = combineReducers({
  options: OptionsReducer,
  twitch: TwitchLiveStreamReducer,
  reddit: RedditReducer,
});

export default CombinedReducers;
