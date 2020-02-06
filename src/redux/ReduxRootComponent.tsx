import * as React from 'react';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

//store
import store from './Store';
import StoreDispatch from './interfaces/StoreDispatch';
import StoreModel from './interfaces/StoreModel';
//actions
import * as TwitchActions from './actions/TwitchLiveStreamActions';

import Main from '../Main';

function MapStateToProps(state: StoreModel): StoreModel {
  return {
    twitch: state.twitch,
  };
}

function MapDispatchToProps(dispatch): StoreDispatch {
  const actionCreators = {
    RequestLiveStreams: TwitchActions.RequestLiveStreams,
  };
  return bindActionCreators(actionCreators, dispatch);
}

const ReduxPropsBinder = connect(MapStateToProps, MapDispatchToProps)(Main);

export default class ReduxRootComponent extends React.Component {
  render(): Provider {
    return (
      <Provider store={store}>
        <ReduxPropsBinder />
      </Provider>
    );
  }
}
