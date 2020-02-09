import { OptionsModel } from './OptionsModel';
import { TwitchModel } from './TwitchModel';
import { RedditModel } from './RedditModel';
import { CSGOModel } from './MatchModel';

export default interface StoreModel {
  options: OptionsModel;
  twitch: TwitchModel;
  reddit: RedditModel;
  csgo: CSGOModel;
}
