import axios from 'axios';
import BaseAction from '../interfaces/BaseAction';
import { SubRedditModel, SubRedditPostModel } from '../interfaces/RedditModel';

export interface RedditLoadingAction extends BaseAction {
  name: string;
}

export interface RedditLoadedAction extends RedditLoadingAction {
  posts: Array<SubRedditPostModel>;
}

export const ActionTypes = {
  REQUESTING_SUB_REDDIT: 'REQUESTING_SUB_REDDIT',
  REQUESTING_SUB_REDDIT_SUCCESS: 'REQUESTING_SUB_REDDIT_SUCCESS',
  REQUESTING_SUB_REDDIT_FAIL: 'REQUESTING_SUB_REDDIT_FAIL',
};

const GetSubReddit = async (name: string): Promise<Array<SubRedditPostModel>> => {
  let posts: Array<SubRedditPostModel> = [];
  try {
    const response = await axios.get(`https://reddit.com/r/${name}.json`);
    posts = response.data.data.children.map(post => {
      return {
        title: post.data.title,
        thumbnail: post.data.thumbnail,
        postHref: post.data.url,
        commentsHref: `https://reddit.com${post.data.permalink}`,
        upVotes: post.data.score,
      };
    });
  } catch (error) {
    return Promise.reject(new Error(error));
  }
  return posts;
};

function RequestingSubReddit(name: string): RedditLoadingAction {
  return {
    type: ActionTypes.REQUESTING_SUB_REDDIT,
    name: name,
  };
}

function RequestedSubRedditSuccess(name: string, posts: Array<SubRedditPostModel>): RedditLoadedAction {
  return {
    type: ActionTypes.REQUESTING_SUB_REDDIT_SUCCESS,
    posts: posts,
    name: name,
  };
}

function RequestedSubRedditFail(name: string): RedditLoadingAction {
  return {
    type: ActionTypes.REQUESTING_SUB_REDDIT_FAIL,
    name: name,
  };
}

export function RequestSubReddit(name: string) {
  return (dispatch): Promise<SubRedditModel> => {
    dispatch(RequestingSubReddit(name));
    return GetSubReddit(name).then(
      posts => dispatch(RequestedSubRedditSuccess(name, posts)),
      () => dispatch(RequestedSubRedditFail(name)),
    );
  };
}
