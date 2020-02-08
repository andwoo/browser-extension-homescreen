import { OptionsModel } from './OptionsModel';
import { TwitchModel } from './TwitchModel';

export default interface StoreModel {
  options: OptionsModel;
  twitch: TwitchModel;
}
