import { Block } from '../interfaces/StoreModel';
import { ActionTypes, BlockAction, BlockUpdateAction, BlocksAction } from '../actions/BlockActions';

function BlockReducer(blocks: Array<Block> = [], action: BlockAction | BlocksAction | BlockUpdateAction):Array<Block> {
  let nextBlocks = [...blocks];
  switch(action.type) {
    case ActionTypes.REPLACE_BLOCKS:
      nextBlocks = [...(action as BlocksAction).blocks];
      break;
    case ActionTypes.ADD_BLOCK:
      action.block.data = JSON.stringify({});
      nextBlocks.push(action.block);
      break;
    case ActionTypes.UPDATE_BLOCK: {
      const cast = (action as BlockUpdateAction);
      const blockId = cast.block.id;
      const index = nextBlocks.findIndex((item) => item.id === blockId);
      if(index !== -1) {
        cast.block.data = cast.dataToString?.();
        nextBlocks[index] = cast.block;
      }
      break;
    }
    case ActionTypes.MOVE_BLOCK_UP: {
      const blockId = action.block.id;
      const index = nextBlocks.findIndex((item) => item.id === blockId);
      if(index !== 0) {
        nextBlocks.splice(index - 1, 2, nextBlocks[index], nextBlocks[index -1]);
      }
      break;
    }
    case ActionTypes.MOVE_BLOCK_DOWN: {
      const blockId = action.block.id;
      const index = nextBlocks.findIndex((item) => item.id === blockId);
      if(index !== nextBlocks.length - 1) {
        nextBlocks.splice(index, 2, nextBlocks[index + 1], nextBlocks[index]);
      }
      break;
    }
    case ActionTypes.REMOVE_BLOCK: {
      const blockId = action.block.id;
      const index = nextBlocks.findIndex((item) => item.id === blockId);
      nextBlocks.splice(index, 1);
      break;
    }
  }
  return nextBlocks;
}

export default BlockReducer;
