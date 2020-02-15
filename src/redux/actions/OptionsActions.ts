import BaseAction from '../interfaces/BaseAction';
import { OptionsModel } from '../interfaces/OptionsModel';
import * as Storage from '@browser-extension/utility-storage';
import * as Constants from '../../constants/StorageValues';

export interface OptionsAction extends BaseAction {
  options: OptionsModel;
}

export const ActionTypes = {
  LOADING_OPTIONS: 'LOADING_OPTIONS',
  LOAD_OPTIONS_SUCCESS: 'LOAD_OPTIONS_SUCCESS',
  LOAD_OPTIONS_FAIL: 'LOAD_OPTIONS_FAIL',
};

const LoadOptionsFromStorage = async (): Promise<OptionsModel> => {
  const options: OptionsModel = {
    isLoading: false,
    error: false,
    twitch: {
      accessToken: '',
    },
    reddit: {
      subReddits: [],
    },
  };

  const twitTokenStorage: Storage.StorageResponse = await Storage.loadFromStorage(Constants.TwitchToken);
  if (twitTokenStorage.success) {
    options.twitch.accessToken = twitTokenStorage.data as string;
  }

  const subRedditStorage: Storage.StorageResponse = await Storage.loadFromStorage(Constants.StorageKeySubReddits);
  if (subRedditStorage.success && subRedditStorage.data.length) {
    options.reddit.subReddits = subRedditStorage.data as Array<string>;
  }

  return options;
};

function LoadingOptions(): BaseAction {
  return {
    type: ActionTypes.LOADING_OPTIONS,
  };
}

function LoadOptionsSuccess(options: OptionsModel): OptionsAction {
  return {
    type: ActionTypes.LOAD_OPTIONS_SUCCESS,
    options: options,
  };
}

function LoadOptionsFail(): BaseAction {
  return {
    type: ActionTypes.LOAD_OPTIONS_FAIL,
  };
}

export function LoadOptions() {
  return (dispatch): Promise<OptionsModel> => {
    dispatch(LoadingOptions());
    return LoadOptionsFromStorage().then(
      options => dispatch(LoadOptionsSuccess(options)),
      () => dispatch(LoadOptionsFail()),
    );
  };
}
