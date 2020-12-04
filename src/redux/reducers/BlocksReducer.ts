import { Block } from '../interfaces/StoreModel';
import { ActionTypes, BlockAction, BlocksAction } from '../actions/BlockActions';

function BlockReducer(blocks: Array<Block> = [], action: BlockAction | BlocksAction):Array<Block> {
  let nextBlocks = [...blocks];
  switch(action.type) {
    case ActionTypes.REPLACE_BLOCKS:
      nextBlocks = [...(action as BlocksAction).blocks];
      break;
    case ActionTypes.ADD_BLOCK:
      nextBlocks.push(action.block);
      break;
  }
  console.log(`BlockReducer type[${action.type}] data[${action?.block ?? action?.blocks }]`);
  return nextBlocks;
}

export default BlockReducer;
