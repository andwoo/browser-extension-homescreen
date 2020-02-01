import * as React from 'react';
import { hot } from 'react-hot-loader';

import { Store } from './redux/Store';

class Main extends React.Component<Store> {
  componentDidMount(): void {}

  render(): JSX.Element {
    return (
      <div>
        <p>Howdy Yall!</p>
        <p>{this.props.testObject.name}</p>
      </div>
    );
  }
}

export default hot(module)(Main);
