import { tracked } from '@glimmer/tracking';
import { v4 as uuidv4 } from 'uuid';

export enum BlockType {
  Launcher = 'Launcher',
  Twitch = 'Twitch',
  Valorant = 'Valorant',
  Reddit = 'Reddit',
  RSS = 'RSS',
}

export default class Block {
  @tracked id: string = '';
  @tracked order: number = 0;
  @tracked type: string = BlockType.Reddit;
  @tracked payload: string = '{}';

  constructor({
    id,
    order,
    type,
    payload,
  }: {
    id?: string;
    order: number;
    type: string;
    payload?: string;
  }) {
    this.id = id ?? uuidv4();
    this.order = order;
    this.type = type;
    this.payload = payload ?? '{}';
  }

  static create(json: string): Block {
    return new Block(JSON.parse(json));
  }

  static serialize(block: Block): string {
    return JSON.stringify({
      id: block.id,
      order: block.order,
      type: block.type,
      payload: block.payload,
    });
  }
}
