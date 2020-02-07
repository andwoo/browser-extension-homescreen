import TwitchModel from './TwitchModel';
import { OptionsModel } from './OptionsModel';

export default interface StoreModel {
  options: OptionsModel;
  twitch: TwitchModel;
}
