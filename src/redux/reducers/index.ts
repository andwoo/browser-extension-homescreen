import { combineReducers } from 'redux';
import OptionsReducer from './OptionsReducer';
import TwitchLiveStreamReducer from './TwitchLiveStreamReducer';
import RedditReducer from './RedditReducer';
import CSGOReducer from './CSGOReducer';

const CombinedReducers = combineReducers({
  options: OptionsReducer,
  twitch: TwitchLiveStreamReducer,
  reddit: RedditReducer,
  csgo: CSGOReducer,
});

export default CombinedReducers;
