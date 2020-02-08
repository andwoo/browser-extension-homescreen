import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Store } from './redux/Store';
import Header from './components/main/Header';
import ScrollField from './components/common/ScrollField';

class Main extends React.Component<Store> {
  componentDidMount(): void {
    this.props.LoadOptions();
  }

  componentDidUpdate(previousProps: Store): void {
    if (previousProps.options.isLoading && !this.props.options.isLoading && this.props.options.twitch.accessToken) {
      this.props.RequestLiveStreams(this.props.options.twitch.accessToken);
    }
  } //className="card tile"

  render(): JSX.Element {
    return (
      <React.Fragment>
        {/* Links Start */}
        <p>{JSON.stringify(this.props.options)}</p>
        <p>{JSON.stringify(this.props.twitch)}</p>
        <Header />
        {/* Links End */}

        <div className="columns is-variable is-1 tile--container">
          {/* Content Tiles Start */}
          <div className="column">
            <ScrollField className="card tile">twitch</ScrollField>
          </div>
          {this.props.options.reddit.subReddits.map((data: string, index: number) => {
            return (
              <div className="column" key={index}>
                <ScrollField className="card tile">{data}</ScrollField>
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
