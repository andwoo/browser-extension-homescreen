export interface RedditModel {
  subReddits: Array<SubRedditModel>;
}

export interface SubRedditModel {
  name: string;
  isLoading: boolean;
  error: boolean;
  posts: Array<SubRedditPostModel>;
}

export interface SubRedditPostModel {
  title: string;
  thumbnail: string;
  postHref: string;
  commentsHref: string;
  upVotes: number;
}
