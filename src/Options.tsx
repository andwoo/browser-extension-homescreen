import * as React from 'react';
import { hot } from 'react-hot-loader';

import * as Storage from '@browser-extension/utility-storage';
import * as Constants from './constants/StorageValues';

interface OptionsState {
  subReddits: Array<string>;
}

class Options extends React.Component<{}, OptionsState> {
  constructor(props) {
    super(props);
    this.state = {
      subReddits: Array(Constants.MaximumSubreddits).fill(''),
    };
  }

  componentDidMount = async (): Promise<void> => {
    const subRedditStorage: Storage.StorageResponse = await Storage.LoadFromStorage(Constants.StorageKeySubReddits);
    if (subRedditStorage.success && subRedditStorage.data.length) {
      this.setState({
        subReddits: this.mergeArrays(this.state.subReddits, subRedditStorage.data as Array<string>),
      });
    }
  };

  mergeArrays(source: Array<string>, mergeWith: Array<string>): Array<string> {
    const merged: Array<string> = [...source];
    for (let i = 0; i < merged.length && i < mergeWith.length; ++i) {
      merged[i] = mergeWith[i];
    }
    return merged;
  }

  handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    Storage.SaveToStorage(Constants.StorageKeySubReddits, this.state.subReddits);
  };

  handleOnSubRedditChanged = (index: number, event: React.ChangeEvent<HTMLInputElement>): void => {
    const subReddits: Array<string> = this.state.subReddits;
    subReddits[index] = event.target.value;
    this.setState({
      subReddits: subReddits,
    });
  };

  render(): JSX.Element {
    return (
      <form onSubmit={this.handleOnSubmit}>
        {this.state.subReddits.map((data: string, index: number) => {
          return (
            <React.Fragment key={index}>
              <label>
                {`Subreddit ${index + 1}:`}
                <input
                  type="text"
                  value={data}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                    this.handleOnSubRedditChanged(index, event)
                  }
                />
              </label>
              <br />
            </React.Fragment>
          );
        })}
        <input type="submit" value="Save" />
      </form>
    );
  }
}

export default hot(module)(Options);
