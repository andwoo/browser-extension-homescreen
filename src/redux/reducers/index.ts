import { combineReducers } from 'redux';
import OptionsReducer from './OptionsReducer';
import TwitchLiveStreamReducer from './TwitchLiveStreamReducer';

const CombinedReducers = combineReducers({ options: OptionsReducer, twitch: TwitchLiveStreamReducer });

export default CombinedReducers;
