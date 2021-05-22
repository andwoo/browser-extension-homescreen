import Service from '@ember/service';
import { browser } from 'webextension-polyfill-ts';

export type StorageResponse = {
  success: boolean;
  data: string;
}

const defaultString = '[]'

export default class StorageService extends Service {
  load = async (key: string): Promise<StorageResponse> => {
    let data: string;
    try {
      const response = await browser.storage.sync.get(key);
      data = response[key] ?? defaultString;
    } catch (error) {
      data = defaultString;
    }
    return {
      success: data != null,
      data: data ?? defaultString,
    };
  };

  save = async (key: string, data: string): Promise<void> => {
    await browser.storage.sync.set({ [key]: data });
  };

  remove = async (key: string): Promise<void> => {
    await browser.storage.sync.remove(key);
  };
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'storage': StorageService;
  }
}
