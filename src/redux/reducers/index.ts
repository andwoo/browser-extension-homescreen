import { combineReducers } from 'redux';
import OptionsReducer from './OptionsReducer';
import TwitchLiveStreamReducer from './TwitchLiveStreamReducer';
import RedditReducer from './RedditReducer';
import esportEventReducer from './EsportEventReducer';

const CombinedReducers = combineReducers({
  options: OptionsReducer,
  twitch: TwitchLiveStreamReducer,
  reddit: RedditReducer,
  esportEvents: esportEventReducer,
});

export default CombinedReducers;
