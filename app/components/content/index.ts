import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import BlockService from '../../services/block';
import Block, { BlockType } from '../../models/block';

export type EditBlockActions = {
  moveLeft: (block: Block) => void;
  moveRight: (block: Block) => void;
  remove: (block: Block) => void;
};
export interface EditBlockArgs {
  item: Block;
  actions: EditBlockActions;
}
export interface ViewBlockArgs {
  item: Block;
}

export default class ContentComponent extends Component<{}> {
  @service('block') declare blockService: BlockService;

  get blockTypes(): BlockType[] {
    //@ts-ignore
    return Object.keys(BlockType).map((type: string) => BlockType[type]);
  }

  get blocks(): {
    block: Block;
    editComponent: string;
    viewComponent: string;
  }[] {
    if (this.blockService.blocks) {
      return this.blockService.blocks.map((block) => ({
        block,
        editComponent: `blocks/edit/${block.type.toLowerCase()}`,
        viewComponent: `blocks/view/${block.type.toLowerCase()}`,
      }));
    }
    return [];
  }

  get editActions(): EditBlockActions {
    return {
      moveLeft: this.moveLeft,
      moveRight: this.moveRight,
      remove: this.remove,
    };
  }

  @action calculateSelectionPosition(
    trigger: Element,
    content: Element
  ): { style: { top: number; left: number } } {
    let triggerRect = trigger.getBoundingClientRect();
    let contentRect = content.getBoundingClientRect();
    return {
      style: {
        top:
          triggerRect.top + (triggerRect.height / 2 - contentRect.height / 2),
        left:
          triggerRect.left + (triggerRect.width / 2 - contentRect.width / 2),
      },
    };
  }

  @action addBlock(type: BlockType): void {
    const order: number = this.blockService.blocks
      .map((block) => block.order)
      .reduce(
        (acc: number, current: number): number => Math.max(current + 1, acc),
        0
      );
    this.blockService.addBlock(
      new Block({
        type,
        order,
      })
    );
  }

  @action moveLeft(block: Block): void {
    const orderedBlocks = this.blockService.blocks.sortBy('order');
    const previousBlock = orderedBlocks[orderedBlocks.indexOf(block) - 1];
    if (previousBlock) {
      const buffer = block.order;
      block.order = previousBlock.order;
      previousBlock.order = buffer;
    }
  }

  @action moveRight(block: Block): void {
    const orderedBlocks = this.blockService.blocks.sortBy('order');
    const nextBlock = orderedBlocks[orderedBlocks.indexOf(block) + 1];
    if (nextBlock) {
      const buffer = block.order;
      block.order = nextBlock.order;
      nextBlock.order = buffer;
    }
  }

  @action remove(block: Block): void {
    this.blockService.removeBlock(block);
  }
}
