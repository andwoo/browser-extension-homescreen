import * as React from 'react';
import TileProps from '../interfaces/TileProps';
import OptionValidatorNotification from '../common/OptionValidatorNofitication';
import * as StringUtils from '../../utils/StringUtils';
import { SubRedditModel, SubRedditPostModel } from '../../redux/interfaces/RedditModel';
import MediaTile from '../common/MediaTile';

interface RedditTileProps extends TileProps {
  name: string;
}

interface RedditTileState {
  isLoading: boolean;
  isValid: boolean;
}

export default class RedditTile extends React.Component<RedditTileProps, RedditTileState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.isLoading(),
      isValid: this.isValid(),
    };
  }

  componentDidMount(): void {
    this.props.RequestSubReddit(this.props.name);
  }

  componentDidUpdate(): void {
    if (this.state.isLoading != this.isLoading() || this.state.isValid != this.isValid()) {
      this.setState({
        isLoading: this.isLoading(),
        isValid: this.isValid(),
      });
    }
  }

  getSubredditDataFromStore = (): SubRedditModel => {
    if (!StringUtils.IsNullOrEmpty(this.props.name)) {
      for (let i = 0; i < this.props.reddit.subReddits.length; ++i) {
        if (this.props.name === this.props.reddit.subReddits[i].name) {
          return this.props.reddit.subReddits[i];
        }
      }
    }

    return null;
  };

  isLoading = (): boolean => {
    const data: SubRedditModel = this.getSubredditDataFromStore();
    return data ? data.isLoading : false;
  };

  isValid = (): boolean => {
    const data: SubRedditModel = this.getSubredditDataFromStore();
    if (!data || data.error || !data.posts || data.posts.length == 0) {
      return false;
    }
    return true;
  };

  render(): JSX.Element {
    const data: SubRedditModel = this.getSubredditDataFromStore();
    return (
      <OptionValidatorNotification
        isLoading={this.state.isLoading}
        validate={this.state.isValid}
        description={
          <p>
            Could not load data for subreddit <strong>{this.props.name}</strong>. Please ensure a valid subreddit has
            been set in options.
          </p>
        }
      >
        {data && data.posts.map(this.renderPostTile)}
      </OptionValidatorNotification>
    );
  }

  renderPostTile = (data: SubRedditPostModel, index: number): JSX.Element => {
    return (
      <MediaTile
        thumbnailHref={data.postHref}
        thumbnail={data.thumbnail}
        href={data.commentsHref}
        defaultTopIcon={this.props.defaultTopIcon}
        activeTopIcon={this.props.activeTopIcon}
        key={index}
        isActive={false}
      >
        <p>
          <small>{data.title}</small> <br />
          <strong className="upvotes">
            <i className="fas fa-angle-up" />
            {` ${data.upVotes}`}
          </strong>
        </p>
      </MediaTile>
    );
  };
}
