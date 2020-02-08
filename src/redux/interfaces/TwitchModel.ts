export interface TwitchModel {
  isLoading: boolean;
  success: boolean;
  streams: Array<TwitchStream>;
}

export interface TwitchStream {
  name: string;
  viewers: number;
  game: string;
  href: string;
  thumbnail: string;
  background: string;
  backgroundColour: string;
}
