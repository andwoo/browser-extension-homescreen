import React, { useEffect } from 'react';
import store from './Store';

const listernCtx = {
  isInitialized: false,
  listeners: []
}
const initListener = (): void => {
  if(listernCtx.isInitialized) {
    return;
  }
  listernCtx.isInitialized = true;
  store.subscribe(() => {
    listernCtx.listeners.forEach(listener => listener?.());
  });
}

const useStateSubscribe = (listener: () => void): void => {
  initListener();
  useEffect(() => {
    console.log(`added subscribe`);
    listernCtx.listeners.push(listener);
    return (): void => {
      const index = listernCtx.listeners.indexOf(listener);
      if (index > -1) {
        console.log(`removed subscribe`);
        listernCtx.listeners.splice(index, 1);
      }
    };
  }, [listener]);
}

export default useStateSubscribe;