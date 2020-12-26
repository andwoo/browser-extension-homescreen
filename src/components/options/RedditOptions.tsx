import React from 'react';
import { Block } from '../../redux/interfaces/StoreModel';
import OptionInput from './OptionInput';

interface RedditOptionProps {
  save: () => void;
  block: Block;
}

interface RedditOptionState {
  subreddit: string
}

export function dataToString(): string {
  return JSON.stringify({subreddit: this?.state?.subreddit ?? ''});
}

export default class RedditOption extends React.Component<RedditOptionProps, RedditOptionState> {
  constructor(props) {
    super(props);
    this.dataToString = dataToString.bind(this);
    this.state = {
      subreddit: ''
    }
  }
  dataToString = (): string => {
    return dataToString.call(this);
  };
  onChange = (value: string): void => {
    this.setState({subreddit: value})
  }
  render(): JSX.Element {
    const initialValue = (JSON.parse(this.props.block.data) as RedditOptionState)?.subreddit ?? ''
    return (
      <div>
        <h1><i className="fab fa-reddit-alien"/></h1>
        <form>
          <OptionInput initialValue={initialValue} placeholder="videos" label="r/" onChange={this.onChange} />
        </form>
      </div>
    )
  }
}
