import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Store } from './redux/Store';
import Header from './components/main/Header';
import ScrollField from './components/common/ScrollField';
import TwitchLiveStreamTile from './components/main/TwitchLiveStreamTile';
import RedditTile from './components/main/RedditTile';
import MatchTicker from './components/main/MatchTicker';

class Main extends React.Component<Store> {
  componentDidMount(): void {
    document.documentElement.className += 'overflow--hidden';
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

        <div className="columns is-variable is-0 column--parent">
          {/* Content Tiles Start */}
          <div className="column">
            <ScrollField className="column--content column--content--first">
              <TwitchLiveStreamTile {...this.props} />
            </ScrollField>
          </div>
          <div className="column">
            <ScrollField className="column--content">
              <MatchTicker {...this.props} />
            </ScrollField>
          </div>
          {this.props.options.reddit.subReddits.map((name: string, index: number) => {
            return (
              <div className="column" key={index}>
                <ScrollField className="column--content">
                  <RedditTile name={name} {...this.props} />
                </ScrollField>
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
