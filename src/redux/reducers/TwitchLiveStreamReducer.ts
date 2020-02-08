import { TwitchModel } from '../interfaces/TwitchModel';
import BaseAction from '../interfaces/BaseAction';
import { TwitchStreamsAction, ActionTypes } from '../actions/TwitchLiveStreamActions';

function TwitchLiveStreamReducer(
  state: TwitchModel = { isLoading: true, error: false, streams: [] },
  action: BaseAction,
): TwitchModel {
  const nextState: TwitchModel = { ...state };
  if (action.type == ActionTypes.REQUESTING_LIVE_STREAMS) {
    nextState.isLoading = true;
    nextState.streams = [];
    nextState.error = false;
  } else if (action.type == ActionTypes.REQUESTING_LIVE_STREAMS_FAIL) {
    nextState.isLoading = false;
    nextState.error = true;
  } else if (action.type == ActionTypes.REQUESTING_LIVE_STREAMS_SUCCESS) {
    nextState.isLoading = false;
    nextState.error = false;
    nextState.streams = (action as TwitchStreamsAction).streams;
  }
  return nextState;
}

export default TwitchLiveStreamReducer;
