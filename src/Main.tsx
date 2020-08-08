import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Store } from './redux/Store';
import Header from './components/main/Header';
import ScrollField from './components/common/ScrollField';
import TwitchLiveStreamTile from './components/main/TwitchLiveStreamTile';
import RedditTile from './components/main/RedditTile';
import MatchTicker from './components/main/MatchTicker';

const topIcons = {
  twitchDefault: 'fas fa-gamepad',
  twitchActive: 'fas fa-gamepad',
  esportDefault: 'fas fa-futbol',
  esportActive: 'fas fa-futbol',
  redditDefault: 'fab fa-reddit-alien',
  redditActive: 'fab fa-reddit-alien',
};

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
              <TwitchLiveStreamTile
                {...this.props}
                defaultTopIcon={topIcons.twitchDefault}
                activeTopIcon={topIcons.twitchActive}
              />
            </ScrollField>
          </div>
          <div className="column">
            <ScrollField className="column--content">
              <MatchTicker {...this.props} defaultTopIcon={topIcons.esportDefault} activeTopIcon={topIcons.esportActive} />
            </ScrollField>
          </div>
          {this.props.options.reddit.subReddits.map((name: string, index: number) => {
            return (
              <div className="column" key={index}>
                <ScrollField className="column--content">
                  <RedditTile
                    name={name}
                    {...this.props}
                    defaultTopIcon={topIcons.redditDefault}
                    activeTopIcon={topIcons.redditActive}
                  />
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
