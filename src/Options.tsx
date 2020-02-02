import * as React from 'react';
import { hot } from 'react-hot-loader';
import SubRedditOptions from './components/options/SubRedditOptions';

class Options extends React.PureComponent {
  private _subReddits: React.RefObject<SubRedditOptions>;

  constructor(props) {
    super(props);
    this._subReddits = React.createRef();
  }

  handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this._subReddits.current.save();
  };

  render(): JSX.Element {
    return (
      <form className="section" onSubmit={this.handleOnSubmit}>
        <SubRedditOptions ref={this._subReddits} />
        <br />
        <input className="button is-success" type="submit" value="Save" />
      </form>
    );
  }
}

export default hot(module)(Options);
