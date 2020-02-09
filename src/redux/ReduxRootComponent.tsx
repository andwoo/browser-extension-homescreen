import * as React from 'react';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

//store
import store from './Store';
import StoreDispatch from './interfaces/StoreDispatch';
import StoreModel from './interfaces/StoreModel';
//actions
import * as OptionActions from './actions/OptionsActions';
import * as TwitchActions from './actions/TwitchLiveStreamActions';
import * as RedditActions from './actions/RedditActions';
import * as CSGOActions from './actions/CSGOActions';

import Main from '../Main';

function MapStateToProps(state: StoreModel): StoreModel {
  return {
    options: state.options,
    twitch: state.twitch,
    reddit: state.reddit,
    csgo: state.csgo,
  };
}

function MapDispatchToProps(dispatch): StoreDispatch {
  const actionCreators = {
    LoadOptions: OptionActions.LoadOptions,
    RequestLiveStreams: TwitchActions.RequestLiveStreams,
    RequestSubReddit: RedditActions.RequestSubReddit,
    RequestCSGOMatches: CSGOActions.RequestCSGOMatches,
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
