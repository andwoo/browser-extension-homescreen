import React from 'react';
import { Block } from '../../redux/interfaces/StoreModel';
import OptionInput from './OptionInput';

interface RedditOptionProps {
  block: Block;
}

interface RedditOptionState {
  subreddit: string
}

export default class RedditOption extends React.Component<RedditOptionProps, RedditOptionState> {
  constructor(props) {
    super(props);
    this.state = {
      subreddit: ''
    }
  }
  dataToString = (): string => {
    return JSON.stringify({subreddit: this.state.subreddit});
  };
  onChange = (value: string): void => {
    this.setState({subreddit: value})
  }
  render(): JSX.Element {
    const initialValue = (JSON.parse(this.props.block.data) as RedditOptionState)?.subreddit ?? ''
    return (
      <div>
        <h1>Reddit</h1>
        <form>
          <OptionInput initialValue={initialValue} placeholder="videos" label="Subreddit" onChange={this.onChange} />
        </form>
      </div>
    )
  }
}
