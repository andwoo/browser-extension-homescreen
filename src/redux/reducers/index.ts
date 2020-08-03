import { combineReducers } from 'redux';
import OptionsReducer from './OptionsReducer';
import TwitchLiveStreamReducer from './TwitchLiveStreamReducer';
import RedditReducer from './RedditReducer';
import CSGOReducer from './CSGOReducer';
import esportEventReducer from './EsportEventReducer';

const CombinedReducers = combineReducers({
  options: OptionsReducer,
  twitch: TwitchLiveStreamReducer,
  reddit: RedditReducer,
  csgo: CSGOReducer,
  esportEvents: esportEventReducer
});

export default CombinedReducers;
