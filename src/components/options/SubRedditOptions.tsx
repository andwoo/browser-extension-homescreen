import * as React from 'react';
import { RedditOptionsModel } from '../../redux/interfaces/OptionsModel';
import SaveStorageEntry from '../interfaces/OptionsEntry';
import * as Constants from '../../constants/StorageValues';
import * as Storage from '@browser-extension/utility-storage';
import TextInput from '../common/TextInput';
import { mergeArrays } from '../../utils/ArrayUtils';

const style = { paddingTop: '1.5rem', paddingBottom: '1.5rem' };

export default class SubRedditOptions extends React.Component<{}, RedditOptionsModel> implements SaveStorageEntry {
  constructor(props) {
    super(props);
    this.state = {
      subReddits: Array(Constants.MaximumSubreddits).fill(''),
    };
  }

  componentDidMount = async (): Promise<void> => {
    await this.load();
  };

  load = async (): Promise<void> => {
    const subRedditStorage: Storage.StorageResponse = await Storage.LoadFromStorage(Constants.StorageKeySubReddits);
    if (subRedditStorage.success && subRedditStorage.data.length) {
      this.setState({
        subReddits: mergeArrays(this.state.subReddits, subRedditStorage.data as Array<string>),
      });
    }
  };

  save = async (): Promise<void> => {
    Storage.SaveToStorage(Constants.StorageKeySubReddits, this.state.subReddits);
  };

  handleOnSubRedditChanged = (index: number, value: string): void => {
    const subReddits: Array<string> = this.state.subReddits;
    subReddits[index] = value;
    this.setState({
      subReddits: subReddits,
    });
  };

  render(): JSX.Element {
    const inputs: Array<React.ReactFragment> = this.state.subReddits.map((data: string, index: number) => {
      return (
        <TextInput
          label={`Subreddit ${index + 1}:`}
          value={data}
          onChange={(value: string): void => this.handleOnSubRedditChanged(index, value)}
          key={index}
        />
      );
    });

    return (
      <div className="panel">
        <p className="panel-heading">Reddit</p>
        <div className="section" style={style}>
          {inputs}
        </div>
      </div>
    );
  }
}
