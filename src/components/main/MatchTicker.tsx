import * as React from 'react';
import TileProps from '../interfaces/TileProps';
import OptionValidatorNotification from '../common/OptionValidatorNofitication';
import { MatchModel } from '../../redux/interfaces/MatchModel';
import MatchTile from '../common/MatchTile';

interface MatchTickerState {
  isLoading: boolean;
  isValid: boolean;
}

export default class MatchTicker extends React.Component<TileProps, MatchTickerState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.isLoading(),
      isValid: this.isValid(),
    };
  }

  componentDidMount(): void {
    this.props.RequestCSGOMatches();
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
    return this.props.csgo.isLoading;
  };

  isValid = (): boolean => {
    if (this.props.csgo.error || !this.props.csgo.matches || this.props.csgo.matches.length === 0) {
      return false;
    }
    return true;
  };

  render(): JSX.Element {
    return (
      <OptionValidatorNotification
        isLoading={this.state.isLoading}
        validate={this.state.isValid}
        description={<p>{this.props.csgo.error ? `Failed to retrieve matches from HLTV.org` : `No Matches`}</p>}
      >
        {this.props.csgo.matches && this.props.csgo.matches.map(this.renderMatchTile)}
      </OptionValidatorNotification>
    );
  }

  renderMatchTile = (data: MatchModel, index: number): JSX.Element => {
    return (
      <MatchTile
        {...data}
        defaultTopIcon={this.props.defaultTopIcon}
        activeTopIcon={this.props.activeTopIcon}
        isActive={data.isLive}
        key={index}
      />
    );
  };
}
