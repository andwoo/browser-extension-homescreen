import Service from '@ember/service';
import Block from '../models/block';
import StorageService from './storage'
import { tracked } from '@glimmer/tracking'

const storageKey = 'blocks'

export default class BlockService extends Service {
  @tracked editing: boolean = false
  @tracked blocks: Block[] = []

  async initialize(owner: unknown): Promise<void> {
    //@ts-ignore
    const storage: StorageService = owner.lookup('service:storage');
    const result = await storage.load(storageKey);
    const parsedBlocks = JSON.parse(result.data)
    this.blocks = []
    parsedBlocks.forEach((json: string) => {
      this.blocks.addObject(Block.create(json))
    });
  }

  async save(owner: unknown): Promise<void> {
    if(this.editing) {
      const serializedBlocks = this.blocks.map((block) => Block.serialize(block));
      //@ts-ignore
      const storage: StorageService = owner.lookup('service:storage');
      storage.save(storageKey, JSON.stringify(serializedBlocks))
    }

  }

  addBlock(block: Block): void {
    if(this.editing) {
      this.blocks.addObject(block)
    }
  }

  removeBlock(block: Block): void {
    if(this.editing) {
      this.blocks.removeObject(block)
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'block': BlockService;
  }
}
