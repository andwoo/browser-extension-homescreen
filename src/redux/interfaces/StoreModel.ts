export interface Block {
  id: string;
  type: string;
}

//REDDIT
export interface RedditPost {
  title: string;
  thumbnail: string;
  postHref: string;
  commentsHref: string;
  upVotes: number;
}

export interface RedditBlock extends Block {
  name: string;
  posts: RedditPost[]
}
//END

export default interface StoreModel {
  blocks: Block[]
}