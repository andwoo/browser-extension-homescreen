import { EsportEventModel, defaultModel } from '../interfaces/EsportEventModel';
import BaseAction from '../interfaces/BaseAction';
import { EsportEventsAction, ActionTypes } from '../actions/EsportEventActions';

function esportEventReducer(state: EsportEventModel = defaultModel, action: BaseAction): EsportEventModel {
  const nextState: EsportEventModel = { ...state };
  if (action.type == ActionTypes.REQUESTING_ESP_EVENTS) {
    nextState.isLoading = true;
    nextState.error = false;
  } else if (action.type == ActionTypes.REQUESTING_ESP_EVENTS_FAIL) {
    nextState.isLoading = false;
    nextState.error = true;
  } else if (action.type == ActionTypes.REQUESTING_ESP_EVENTS_SUCCESS) {
    nextState.isLoading = false;
    nextState.error = false;
    nextState.events = (action as EsportEventsAction).events;
  }

  return nextState;
}

export default esportEventReducer;
