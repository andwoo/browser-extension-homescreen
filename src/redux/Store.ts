import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CombinedReducers from './reducers/index';
import StoreDispatch from './interfaces/StoreDispatch';
import StoreModel from './interfaces/StoreModel';
import { defaultModel as esportDefaultModel } from './interfaces/EsportEventModel';

//combined interface for easy include in React Components
export interface Store extends StoreDispatch, StoreModel { }

const defaultModel: StoreModel = {
  options: {
    isLoading: true,
    error: false,
    twitch: {
      accessToken: '',
    },
    reddit: {
      subReddits: [],
    },
  },
  twitch: {
    isLoading: true,
    error: false,
    streams: [],
  },
  reddit: {
    subReddits: [],
  },
  esportEvents: esportDefaultModel,
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
