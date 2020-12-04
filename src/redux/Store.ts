import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CombinedReducers from './reducers/index';
import StoreModel from './interfaces/StoreModel';

//combined interface for easy include in React Components
export type Store = StoreModel

const defaultModel: StoreModel = {
  blocks: []
};

/* eslint-disable */
const middlewareEnhancer = applyMiddleware(thunk);
const composedEnhancers = compose(middlewareEnhancer, window['devToolsExtension'] ? window['devToolsExtension']() : f => f);
const store = createStore(CombinedReducers, defaultModel, composedEnhancers);
/* eslint-enable */

if (module['hot']) {
  module['hot'].accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
