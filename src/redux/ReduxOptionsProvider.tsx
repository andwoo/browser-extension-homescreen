import React from 'react';
import { Provider } from 'react-redux';

import store from './Store';
import { useSaveStateToStorage } from './hooks';
import Options from '../Options';
const ReduxOptionsComponent = (): JSX.Element => {
  useSaveStateToStorage();
  return (
    <Provider store={store}>
      <Options />
    </Provider>
  );
}

export default ReduxOptionsComponent;
