import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Store } from './redux/Store';
import Header from './components/main/Header';
import ScrollField from './components/common/ScrollField';
import TwitchLiveStreamTile from './components/main/TwitchLiveStreamTile';

class Main extends React.Component<Store> {
  componentDidMount(): void {
    this.props.LoadOptions();
  }

  componentDidUpdate(previousProps: Store): void {
    if (previousProps.options.isLoading && !this.props.options.isLoading && this.props.options.twitch.accessToken) {
      this.props.RequestLiveStreams(this.props.options.twitch.accessToken);
    }
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        {/* Links Start */}
        <Header />
        {/* Links End */}

        <div className="columns is-variable is-0">
          {/* Content Tiles Start */}
          <div className="column">
            <ScrollField className="column--content">
              <TwitchLiveStreamTile {...this.props} />
            </ScrollField>
          </div>
          {this.props.options.reddit.subReddits.map((data: string, index: number) => {
            return (
              <div className="column" key={index}>
                <ScrollField className="card column--content">{data}</ScrollField>
              </div>
            );
          })}
          {/* Content Tiles End */}
        </div>
      </React.Fragment>
    );
  }
}

export default hot(module)(Main);
