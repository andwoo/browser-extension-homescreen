import { OptionsModel } from './OptionsModel';
import { TwitchModel } from './TwitchModel';
import { RedditModel } from './RedditModel';

export default interface StoreModel {
  options: OptionsModel;
  twitch: TwitchModel;
  reddit: RedditModel;
}
