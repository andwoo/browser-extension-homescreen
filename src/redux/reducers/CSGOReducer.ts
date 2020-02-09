import { CSGOModel } from '../interfaces/MatchModel';
import BaseAction from '../interfaces/BaseAction';
import { GetMatchesAction, ActionTypes } from '../actions/CSGOActions';

function CSGOReducer(state: CSGOModel = { isLoading: true, error: false, matches: [] }, action: BaseAction): CSGOModel {
  const nextState: CSGOModel = { ...state };
  if (action.type == ActionTypes.REQUESTING_CSGO_MATCHES) {
    nextState.isLoading = true;
    nextState.error = false;
  } else if (action.type == ActionTypes.REQUESTING_CSGO_MATCHES_FAIL) {
    nextState.isLoading = false;
    nextState.error = true;
  } else if (action.type == ActionTypes.REQUESTING_CSGO_MATCHES_SUCCESS) {
    nextState.isLoading = false;
    nextState.error = false;
    nextState.matches = (action as GetMatchesAction).matches;
  }

  return nextState;
}

export default CSGOReducer;
