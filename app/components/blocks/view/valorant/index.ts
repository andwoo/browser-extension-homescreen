import Component from '@glimmer/component';
import { ViewBlockArgs } from '../../../content';
import { action } from '@ember/object';

export default class ViewValorantComponent extends Component<ViewBlockArgs> {
  @action initialize(): void {}
}
