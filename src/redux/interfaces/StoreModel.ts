export interface Block {
  id: string;
  type: string;
  data?: string;
}

export default interface StoreModel {
  blocks: Block[]
}
