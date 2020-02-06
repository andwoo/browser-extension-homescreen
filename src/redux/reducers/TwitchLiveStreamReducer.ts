import TwitchModel from '../interfaces/TwitchModel';
import BaseAction from '../interfaces/BaseAction';
import { TwitchStreamsAction } from '../actions/TwitchLiveStreamActions';

export const REQUESTING_LIVE_STREAMS = 'REQUESTING_LIVE_STREAMS';
export const REQUESTING_LIVE_STREAMS_SUCCESS = 'REQUESTING_LIVE_STREAMS_SUCCESS';
export const REQUESTING_LIVE_STREAMS_FAIL = 'REQUESTING_LIVE_STREAMS_FAIL';

function TwitchLiveStreamReducer(
  state: TwitchModel = { isLoading: false, success: false, streams: [] },
  action: BaseAction,
): TwitchModel {
  const nextState: TwitchModel = { ...state };
  if (action.type == REQUESTING_LIVE_STREAMS) {
    nextState.isLoading = true;
    nextState.streams = [];
    nextState.success = false;
  } else if (action.type == REQUESTING_LIVE_STREAMS_FAIL) {
    nextState.isLoading = false;
    nextState.success = false;
  } else if (action.type == REQUESTING_LIVE_STREAMS_SUCCESS) {
    nextState.isLoading = false;
    nextState.success = true;
    nextState.streams = (action as TwitchStreamsAction).streams;
  }
  return nextState;
}

export default TwitchLiveStreamReducer;
