import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import BlockService from '../../services/block';
import Block, { BlockType } from '../../models/block';
import { getOwner } from '@ember/application';

export default class ContentComponent extends Component<{}> {
  @service('block') declare blockService: BlockService;

  get blockTypes(): BlockType[] {
    //@ts-ignore
    return Object.keys(BlockType).map((type: string) => BlockType[type]);
  }

  get blocks(): Block[] {
    return this.blockService.blocks ?? [];
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
    this.blockService.save(getOwner(this));
  }

  @action moveBlockLeft(block: Block): void {
    const orderedBlocks = this.blockService.blocks.sortBy('order');
    const previousBlock = orderedBlocks[orderedBlocks.indexOf(block) - 1];
    if (previousBlock) {
      const buffer = block.order;
      block.order = previousBlock.order;
      previousBlock.order = buffer;
      this.blockService.save(getOwner(this));
    }
  }

  @action moveBlockRight(block: Block): void {
    const orderedBlocks = this.blockService.blocks.sortBy('order');
    const nextBlock = orderedBlocks[orderedBlocks.indexOf(block) + 1];
    if (nextBlock) {
      const buffer = block.order;
      block.order = nextBlock.order;
      nextBlock.order = buffer;
      this.blockService.save(getOwner(this));
    }
  }

  @action removeBlock(block: Block): void {
    this.blockService.removeBlock(block);
    this.blockService.save(getOwner(this));
  }
}
