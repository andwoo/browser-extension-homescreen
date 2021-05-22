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
    this.blockService.addBlock(
      new Block({
        type,
        order: 0,
      })
    );
    this.blockService.save(getOwner(this));
  }

  @action removeBlock(block: Block): void {
    this.blockService.removeBlock(block);
    this.blockService.save(getOwner(this));
  }
}
