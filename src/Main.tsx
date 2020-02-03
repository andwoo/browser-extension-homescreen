import * as React from 'react';
import { hot } from 'react-hot-loader';

import { Store } from './redux/Store';

class Main extends React.Component<Store> {
  componentDidMount(): void {}

  render(): JSX.Element {
    return (
      <div className="columns">
        <div className="column">
          {/* Links Start */}
          <div className="card icons">Links</div>
          {/* Links End */}

          <div className="columns">
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
        </div>
      </div>
    );
  }
}

export default hot(module)(Main);
