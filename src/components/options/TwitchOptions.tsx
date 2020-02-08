import * as React from 'react';
import { TwitchOptionsModel } from '../../redux/interfaces/OptionsModel';
import SaveStorageEntry from '../interfaces/OptionsEntry';
import * as Constants from '../../constants/StorageValues';
import * as Storage from '@browser-extension/utility-storage';
import TextInput from '../common/TextInput';

const style = { paddingTop: '1.5rem', paddingBottom: '1.5rem' };

export default class TwitchOptions extends React.Component<{}, TwitchOptionsModel> implements SaveStorageEntry {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
    };
  }

  componentDidMount = async (): Promise<void> => {
    await this.load();
  };

  load = async (): Promise<void> => {
    const twitTokenStorage: Storage.StorageResponse = await Storage.LoadFromStorage(Constants.TwitchToken);
    if (twitTokenStorage.success) {
      this.setState({
        accessToken: twitTokenStorage.data as string,
      });
    }
  };

  save = async (): Promise<void> => {
    Storage.SaveToStorage(Constants.TwitchToken, this.state.accessToken);
  };

  handleOnTokenChanged = (value: string): void => {
    this.setState({
      accessToken: value,
    });
  };
  handleOnGenerateToken = (): void => {
    window.open('https://twitchtokengenerator.com/', '_blank');
  };

  render(): JSX.Element {
    return (
      <div className="panel">
        <p className="panel-heading">Twitch</p>
        <div className="section" style={style}>
          <TextInput label={'Token'} value={this.state.accessToken} onChange={this.handleOnTokenChanged} />
          <div className="notification is-warning is-light">
            Create a token with the scope permission <strong>user_read</strong>.
          </div>
          <button className="button is-success is-light" onClick={this.handleOnGenerateToken}>
            Generate Token
          </button>
        </div>
      </div>
    );
  }
}
//is-family-monospace
