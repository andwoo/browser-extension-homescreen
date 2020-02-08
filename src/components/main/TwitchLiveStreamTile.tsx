import * as React from 'react';
import { Store } from '../../redux/Store';
import OptionValidatorNotification from '../common/OptionValidatorNofitication';
import * as StringUtils from '../../utils/StringUtils';
import { TwitchStream } from '../../redux/interfaces/TwitchModel';
import MediaTile from '../common/MediaTile';

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
    const acessToken: string = this.props.options.twitch.accessToken;
    return !StringUtils.IsNullOrEmpty(acessToken) && (this.props.options.isLoading || this.props.twitch.isLoading);
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
        description={
          <p>
            Could not load live Twitch streamer feed. Please ensure a valid Twitch access token has been set in options.
          </p>
        }
      >
        {this.props.twitch.streams.map(this.renderStreamerTile)}
      </OptionValidatorNotification>
    );
  }

  renderStreamerTile = (data: TwitchStream, index: number): JSX.Element => {
    return (
      <MediaTile thumbnailHref={data.href} thumbnail={data.thumbnail} href={data.href} key={index}>
        <p>
          <strong>{data.name}</strong> <small>{data.game}</small> <br />
          <strong className="live">
            <i className="far fa-users-crown" />
            {` ${data.viewers}`}
          </strong>
          <br />
        </p>
      </MediaTile>
    );
  };
}
