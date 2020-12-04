import React from 'react';
import { Provider } from 'react-redux';

import store from './Store';
import useStateSubscribe from './useStateSubscribe';
import Options from '../Options';

const ReduxOptionsComponent = (): JSX.Element => {
  useStateSubscribe(() => {
    console.log(`State saving`);
  });

  return (
    <Provider store={store}>
      <Options />
    </Provider>
  );
}

export default ReduxOptionsComponent;
