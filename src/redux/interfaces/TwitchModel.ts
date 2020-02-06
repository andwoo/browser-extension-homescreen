import TwitchStream from './TwitchStream';

export default interface TwitchModel {
  isLoading: boolean;
  success: boolean;
  streams: Array<TwitchStream>;
}
