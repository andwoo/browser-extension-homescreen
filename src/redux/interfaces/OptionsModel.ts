export interface OptionsModel {
  isLoading: boolean;
  success: boolean;
  twitch: TwitchOptionsModel;
  reddit: RedditOptionsModel;
}

export interface TwitchOptionsModel {
  accessToken: string;
}

export interface RedditOptionsModel {
  subReddits: Array<string>;
}
