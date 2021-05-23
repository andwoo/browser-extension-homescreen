import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import BlockService from '../../services/block';
import Block, { BlockType } from '../../models/block';
import { getOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';

export type EditBlockActions = {
  moveLeft: (block: Block) => void;
  moveRight: (block: Block) => void;
  remove: (block: Block) => void;
  save: () => void;
};
export interface EditBlockArgs {
  item: Block;
  actions: EditBlockActions;
}

export default class ContentComponent extends Component<{}> {
  @service('block') declare blockService: BlockService;
  @tracked ting: string = '';

  get blockTypes(): BlockType[] {
    //@ts-ignore
    return Object.keys(BlockType).map((type: string) => BlockType[type]);
  }

  get blocks(): { block: Block; component: string }[] {
    if (this.blockService.blocks) {
      return this.blockService.blocks.map((block) => ({
        block,
        component: `edit/${block.type.toLowerCase()}`,
      }));
    }
    return [];
  }

  get editActions(): EditBlockActions {
    return {
      moveLeft: this.moveLeft,
      moveRight: this.moveRight,
      remove: this.remove,
      save: this.save,
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

  @action save(): void {
    this.blockService.save(getOwner(this));
  }
}
