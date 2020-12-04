import React, { useEffect, useState } from 'react';
import { saveToStorage, loadFromStorage } from '@browser-extension/utility-storage';
import store from './Store';
import { BlocksAction } from './actions/BlockActions';
import { Block } from './interfaces/StoreModel';

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

const useSaveStateToStorage = () => {
  const [inProgress, setProgress] = useState(false);
  const [success, setSuccess] = useState(true);
  useStateSubscribe(() => {
    const state = store.getState();
    (async():Promise<void> => {
      console.log(`useSaveStateToStorage() saving to storage`);
      setProgress(true);
      await saveToStorage('options', JSON.stringify(state.blocks))
      console.log(`useSaveStateToStorage() saving to storage complete`);
      setProgress(false);
      setSuccess(true);
    })();
  });
  return [inProgress, success];
}

const useLoadStateFromStorage = (addBlocks: (blocks: Array<Block>) => BlocksAction) => {
  const [inProgress, setProgress] = useState(false);
  const [success, setSuccess] = useState(true);
  useEffect(() => {
    (async():Promise<void> => {
      console.log(`useLoadStateFromStorage() loading from storage`);
      setProgress(true);
      const response = await loadFromStorage('options');
      if(response.success) {
        const data: Array<Block> = JSON.parse(response.data as string) as Array<Block>;
        console.log(`useLoadStateFromStorage() loading from storage data[${JSON.stringify(data)}]`);
        addBlocks(data);
      }
      console.log(`useLoadStateFromStorage() loading from storage complete`);
      setProgress(false);
      setSuccess(response.success);
    })();
  }, [addBlocks]);
  return [inProgress, success];
}

export {useStateSubscribe, useSaveStateToStorage, useLoadStateFromStorage};