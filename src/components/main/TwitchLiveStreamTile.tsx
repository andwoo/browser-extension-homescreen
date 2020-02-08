import * as React from 'react';
import { Store } from '../../redux/Store';
import OptionValidatorNotification from '../common/OptionValidatorNofitication';
import * as StringUtils from '../../utils/StringUtils';
import { TwitchStream } from '../../redux/interfaces/TwitchModel';

interface TwitchLiveStreamTileState {
  isLoading: boolean;
  isValid: boolean;
}

export default class TwitchLiveStreamTile extends React.Component<Store, TwitchLiveStreamTileState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.isLoading(),
      isValid: this.isValid(),
    };
  }

  componentDidUpdate(): void {
    if (this.state.isLoading != this.isLoading() || this.state.isValid != this.isValid()) {
      this.setState({
        isLoading: this.isLoading(),
        isValid: this.isValid(),
      });
    }
  }

  isLoading = (): boolean => {
    return this.props.options.isLoading || this.props.twitch.isLoading;
  };

  isValid = (): boolean => {
    const acessToken: string = this.props.options.twitch.accessToken;
    if (StringUtils.IsNullOrEmpty(acessToken) || this.props.twitch.error) {
      return false;
    }
    return true;
  };

  render(): JSX.Element {
    return (
      <OptionValidatorNotification
        isLoading={this.state.isLoading}
        validate={this.state.isValid}
        description="Could not load live Twitch streamer feed. Please ensure a valid Twitch access token has been set in options."
      >
        {this.props.twitch.streams.map(this.renderStreamerTile)}
      </OptionValidatorNotification>
    );
  }

  renderStreamerTile = (data: TwitchStream, index: number): JSX.Element => {
    return (
      <div className="tile--parent">
        <div className="box is-marginless tile--content" key={index}>
          <a className="dark" href={data.href}>
            <article className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  <img src={data.thumbnail} alt="Image" />
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{data.name}</strong> <small>{data.game}</small> <br />
                    <strong className="live">
                      <i className="far fa-users-crown"></i>
                      {` ${data.viewers}`}
                    </strong>
                    <br />
                  </p>
                </div>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item" aria-label="reply">
                    <span className="icon is-small dark">
                      <i className="fad fa-external-link" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>
              </nav>
            </article>
          </a>
        </div>
      </div>
    );
  };
}
