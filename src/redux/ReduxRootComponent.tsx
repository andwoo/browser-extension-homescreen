import * as React from 'react';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

//store
import store, { StoreDispatch, StoreModel } from './Store';
//actions
import * as TestActions from './actions/TestAction';

import Main from '../Main';

function MapStateToProps(state: StoreModel): StoreModel {
  return {
    testObject: state.testObject,
  };
}

function MapDispatchToProps(dispatch): StoreDispatch {
  return bindActionCreators({ ...TestActions }, dispatch);
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
