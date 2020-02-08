import { RedditModel, SubRedditModel } from '../interfaces/RedditModel';
import { RedditLoadingAction, RedditLoadedAction, ActionTypes } from '../actions/RedditActions';

const getSubredditModel = (name: string, subReddits: Array<SubRedditModel>): SubRedditModel => {
  for (let i = 0; i < subReddits.length; ++i) {
    if (name === subReddits[i].name) {
      return subReddits[i];
    }
  }
  const subReddit: SubRedditModel = {
    name: name || '',
    isLoading: false,
    error: false,
    posts: [],
  };
  subReddits.push(subReddit);
  return subReddit;
};

function RedditReducer(state: RedditModel = { subReddits: [] }, action: RedditLoadingAction): RedditModel {
  const nextState: RedditModel = { ...state };
  const subReddit: SubRedditModel = getSubredditModel(action.name, nextState.subReddits);
  if (action.type == ActionTypes.REQUESTING_SUB_REDDIT) {
    subReddit.isLoading = true;
    subReddit.error = false;
  } else if (action.type == ActionTypes.REQUESTING_SUB_REDDIT_FAIL) {
    subReddit.isLoading = false;
    subReddit.error = true;
  } else if (action.type == ActionTypes.REQUESTING_SUB_REDDIT_SUCCESS) {
    subReddit.isLoading = false;
    subReddit.error = false;
    subReddit.posts = (action as RedditLoadedAction).posts;
  }

  return nextState;
}

export default RedditReducer;
