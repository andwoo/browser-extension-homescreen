import { Store } from '../../redux/Store';

export default interface TileProps extends Store {
  defaultTopIcon: string;
  activeTopIcon: string;
}
