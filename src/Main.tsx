import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Store } from './redux/Store';
import Header from './components/main/Header';

class Main extends React.Component<Store> {
  componentDidMount(): void {
    this.props.RequestLiveStreams('');
  }
  render(): JSX.Element {
    return (
      <React.Fragment>
        {/* Links Start */}
        <p>{JSON.stringify(this.props.twitch)}</p>
        <Header />
        {/* Links End */}

        <div className="columns is-variable is-1 tile--container">
          {/* Content Tiles Start */}
          <div className="column">
            <div className="card tile">twitch</div>
          </div>
          <div className="column">
            <div className="card tile">csgo</div>
          </div>
          <div className="column">
            <div className="card tile">overwatch</div>
          </div>
          <div className="column">
            <div className="card tile">reddit1</div>
          </div>
          <div className="column">
            <div className="card tile">reddit2</div>
          </div>
          <div className="column">
            <div className="card tile">reddit3</div>
          </div>
          {/* Content Tiles End */}
        </div>
      </React.Fragment>
    );
  }
}

export default hot(module)(Main);
