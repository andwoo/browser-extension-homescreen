import { combineReducers } from 'redux';
import TwitchLiveStreamReducer from './TwitchLiveStreamReducer';

const CombinedReducers = combineReducers({ twitch: TwitchLiveStreamReducer });

export default CombinedReducers;
