import React from 'react';
import { Provider } from 'react-redux';

import store from './Store';
import Main from '../Main';

const ReduxRootComponent = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default ReduxRootComponent;
