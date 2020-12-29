import React from 'react';
import { Block } from '../../redux/interfaces/StoreModel';

interface RedditOptionProps {
  block: Block;
}

export function dataToString(): string {
  return '';
}

export default class RedditOption extends React.Component<RedditOptionProps> {
  constructor(props) {
    super(props);
    this.dataToString = dataToString.bind(this);
  }
  dataToString = (): string => {
    return dataToString.call(this);
  };
  render(): JSX.Element {
    return null;
  }
}
