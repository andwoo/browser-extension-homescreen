import React, {useState, useEffect} from 'react';
import { Block } from '../../redux/interfaces/StoreModel';

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
    return (
      <div>
        <h1>Reddit</h1>
        <RedditOptionHook block={this.props.block} onChange={this.onChange}/>
      </div>
    )
  }
}

const RedditOptionHook = ({block, onChange}: {block: Block, onChange: (value: string) => void }): JSX.Element => {
  const parseData = (): string => {
    return (JSON.parse(block.data) as RedditOptionState)?.subreddit ?? '';
  };
  const [subreddit, setSubreddit] = useState(parseData());
  useEffect(() => {
    onChange(subreddit);
  }, [subreddit]);

  return (
    <form>
      <label>
        Subreddit:
        <input type="text" value={subreddit} placeholder="videos" onChange={(event): void => {
          setSubreddit(event.target.value);
        }} />
      </label>
    </form>
  )
}
