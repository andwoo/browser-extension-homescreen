import * as React from 'react';
import { hot } from 'react-hot-loader';
import SubRedditOptions from './components/options/SubRedditOptions';
import TwitchOptions from './components/options/TwitchOptions';

interface OptionsState {
  saveInProgress: boolean;
  showSaveNotification: boolean;
}

class Options extends React.PureComponent<{}, OptionsState> {
  private _subReddits: React.RefObject<SubRedditOptions>;
  private _twitch: React.RefObject<TwitchOptions>;

  constructor(props) {
    super(props);
    this._subReddits = React.createRef();
    this._twitch = React.createRef();
    this.state = {
      saveInProgress: false,
      showSaveNotification: false,
    };
  }

  handleOnSubmit = async (): Promise<void> => {
    if (this.state.saveInProgress) {
      return;
    }

    this.setSaveStatus(true);
    this.showSaveNoficiation(false);
    await this._subReddits.current.save();
    await this._twitch.current.save();
    setTimeout((): void => {
      this.setSaveStatus(false);
      this.showSaveNoficiation(true);
    }, 1000);
  };

  setSaveStatus = (saveInProgress: boolean): void => {
    this.setState({
      saveInProgress: saveInProgress,
    });
  };

  showSaveNoficiation = (show: boolean): void => {
    this.setState({
      showSaveNotification: show,
    });
  };

  render(): JSX.Element {
    let saveNotification: JSX.Element;
    if (this.state.showSaveNotification) {
      saveNotification = (
        <div>
          <br />
          <div className="notification">
            <button className="delete" onClick={(): void => this.showSaveNoficiation(false)} />
            Changes have been saved.
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="section">
          <SubRedditOptions ref={this._subReddits} />
          <TwitchOptions ref={this._twitch} />
          <br />
          <button
            className={`button is-success ${this.state.saveInProgress ? 'is-loading' : ''}`}
            onClick={(): void => {
              this.handleOnSubmit();
            }}
          >
            Save
          </button>
          {saveNotification}
        </div>
      </React.Fragment>
    );
  }
}

export default hot(module)(Options);
