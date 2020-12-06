// import axios from 'axios';
// import jsonpAdapter from 'axios-jsonp';
// import { decodeString } from '../../utils/StringUtils';
import { AnyAction } from 'redux';
import { Block } from '../interfaces/StoreModel'

export const ActionTypes = {
  REPLACE_BLOCKS: 'REPLACE_BLOCKS',
  ADD_BLOCK: 'ADD_BLOCK',
  UPDATE_BLOCK: 'UPDATE_BLOCK',
  MOVE_BLOCK_UP: 'MOVE_BLOCK_UP',
  MOVE_BLOCK_DOWN: 'MOVE_BLOCK_DOWN',
  REMOVE_BLOCK: 'REMOVE_BLOCK',
};

export interface BlockAction extends AnyAction {
  block: Block;
}

export interface BlockUpdateAction extends AnyAction {
  block: Block;
  dataToString: () => string;
}

export interface BlocksAction extends AnyAction {
  blocks: Array<Block>;
}

export function addBlocks(blocks: Array<Block>): BlocksAction {
  return {
    type: ActionTypes.REPLACE_BLOCKS,
    blocks
  }
}

export function addBlock(block: Block, dataToString: () => string): BlockUpdateAction {
  return {
    type: ActionTypes.ADD_BLOCK,
    block,
    dataToString
  }
}

export function updateBlock(block: Block, dataToString: () => string): BlockUpdateAction {
  return {
    type: ActionTypes.UPDATE_BLOCK,
    block,
    dataToString
  }
}

export function moveBlockUp(block: Block): BlockAction {
  return {
    type: ActionTypes.MOVE_BLOCK_UP,
    block
  }
}
export function moveBlockDown(block: Block): BlockAction {
  return {
    type: ActionTypes.MOVE_BLOCK_DOWN,
    block
  }
}

export function removeBlock(block: Block): BlockAction {
  return {
    type: ActionTypes.REMOVE_BLOCK,
    block
  }
}

// const GetSubReddit = async (name: string): Promise<Array<SubRedditPostModel>> => {
//   let posts: Array<SubRedditPostModel> = [];
//   try {
//     const response = await axios.get(`https://reddit.com/r/${name}.json`/*, { adapter: jsonpAdapter }*/);
//     posts = response.data.data.children.map((post) => {
//       let thumbnail: string = post.data.thumbnail;
//       if (!thumbnail || thumbnail === 'self') {
//         thumbnail = null;
//       }
//       return {
//         title: decodeString(post.data.title),
//         thumbnail: thumbnail,
//         postHref: post.data.url,
//         commentsHref: `https://reddit.com${post.data.permalink}`,
//         upVotes: post.data.score,
//       };
//     });
//   } catch (error) {
//     return Promise.reject(new Error(error));
//   }
//   return posts;
// };

// function RequestingSubReddit(name: string): RedditLoadingAction {
//   return {
//     type: ActionTypes.REQUESTING_SUB_REDDIT,
//     name: name,
//   };
// }

// function RequestedSubRedditSuccess(name: string, posts: Array<SubRedditPostModel>): RedditLoadedAction {
//   return {
//     type: ActionTypes.REQUESTING_SUB_REDDIT_SUCCESS,
//     posts: posts,
//     name: name,
//   };
// }

// function RequestedSubRedditFail(name: string): RedditLoadingAction {
//   return {
//     type: ActionTypes.REQUESTING_SUB_REDDIT_FAIL,
//     name: name,
//   };
// }

// export function RequestSubReddit(name: string) {
//   return (dispatch): Promise<SubRedditModel> => {
//     dispatch(RequestingSubReddit(name));
//     return GetSubReddit(name).then(
//       (posts) => dispatch(RequestedSubRedditSuccess(name, posts)),
//       () => dispatch(RequestedSubRedditFail(name)),
//     );
//   };
// }
