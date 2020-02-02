import * as React from 'react';
import SaveStorageEntry from '../../interfaces/options/OptionsEntry';
import * as Constants from '../../constants/StorageValues';
import * as Storage from '@browser-extension/utility-storage';
import TextInput from '../common/TextInput';

interface SubRedditOptionsState {
  twitchToken: string;
}

const style = { paddingTop: '1.5rem', paddingBottom: '1.5rem' };

export default class TwitchOptions extends React.Component<{}, SubRedditOptionsState> implements SaveStorageEntry {
  constructor(props) {
    super(props);
    this.state = {
      twitchToken: '',
    };
  }

  componentDidMount = async (): Promise<void> => {
    await this.load();
  };

  load = async (): Promise<void> => {
    const twitTokenStorage: Storage.StorageResponse = await Storage.LoadFromStorage(Constants.TwitchToken);
    if (twitTokenStorage.success) {
      this.setState({
        twitchToken: twitTokenStorage.data as string,
      });
    }
  };

  save = async (): Promise<void> => {
    Storage.SaveToStorage(Constants.TwitchToken, this.state.twitchToken);
  };

  handleOnTokenChanged = (value: string): void => {
    this.setState({
      twitchToken: value,
    });
  };
  handleOnGenerateToken = (): void => {
    window.open('https://twitchtokengenerator.com/', '_blank');
  };

  render(): JSX.Element {
    return (
      <div className="panel is-success">
        <p className="panel-heading">Twitch Token</p>
        <div className="section" style={style}>
          <TextInput label={'Token'} value={this.state.twitchToken} onChange={this.handleOnTokenChanged} />
          <button className="button is-success is-light" onClick={this.handleOnGenerateToken}>
            Generate Token
          </button>
        </div>
      </div>
    );
  }
}
