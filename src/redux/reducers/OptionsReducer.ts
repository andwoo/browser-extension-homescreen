import { OptionsModel } from '../interfaces/OptionsModel';
import BaseAction from '../interfaces/BaseAction';
import { OptionsAction, ActionTypes } from '../actions/OptionsActions';

export const REQUESTING_LIVE_STREAMS = 'REQUESTING_LIVE_STREAMS';
export const REQUESTING_LIVE_STREAMS_SUCCESS = 'REQUESTING_LIVE_STREAMS_SUCCESS';
export const REQUESTING_LIVE_STREAMS_FAIL = 'REQUESTING_LIVE_STREAMS_FAIL';

function OptionsReducer(
  state: OptionsModel = { isLoading: false, success: false, twitch: { accessToken: '' }, reddit: { subReddits: [] } },
  action: BaseAction,
): OptionsModel {
  const nextState: OptionsModel = { ...state };
  if (action.type == ActionTypes.LOADING_OPTIONS) {
    nextState.isLoading = true;
    nextState.success = false;
    nextState.twitch.accessToken = '';
    nextState.reddit.subReddits = [];
  } else if (action.type == ActionTypes.LOAD_OPTIONS_FAIL) {
    nextState.isLoading = false;
    nextState.success = false;
    nextState.twitch.accessToken = '';
    nextState.reddit.subReddits = [];
  } else if (action.type == ActionTypes.LOAD_OPTIONS_SUCCESS) {
    nextState.isLoading = false;
    nextState.success = true;
    nextState.twitch.accessToken = (action as OptionsAction).options.twitch.accessToken;
    nextState.reddit.subReddits = (action as OptionsAction).options.reddit.subReddits;
  }
  return nextState;
}

export default OptionsReducer;
