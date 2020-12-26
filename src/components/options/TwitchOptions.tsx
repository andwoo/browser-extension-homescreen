import React from 'react';
import { Block } from '../../redux/interfaces/StoreModel';
import OptionInput from './OptionInput';
import Box from '../styled/Box';
import Button from '../styled/Button';
import * as StyleConstants from '../styled/StyleConstants';

const IconStyle: React.CSSProperties = {
  marginLeft: StyleConstants.Paddings.small,
  marginRight: StyleConstants.Paddings.small
}
const topMarginStyle: React.CSSProperties = {
  marginTop: StyleConstants.Paddings.small
}

interface TwitchOptionProps {
  save: () => void;
  block: Block;
}

interface TwitchOptionState {
  token: string;
}

export function dataToString(): string {
  return JSON.stringify({token: this?.state?.token ?? ''});
}

export default class TwitchOption extends React.Component<TwitchOptionProps, TwitchOptionState> {
  constructor(props) {
    super(props);
    this.dataToString = dataToString.bind(this);
    this.state = {
      token: ''
    }
  }
  dataToString = (): string => {
    return dataToString.call(this);
  };
  onChange = (value: string): void => {
    this.setState({token: value})
  }
  handleOnGenerate = (): void => {
    window.open('https://twitchtokengenerator.com/', '_blank');
  }
  render(): JSX.Element {
    const initialValue = (JSON.parse(this.props.block.data) as TwitchOptionState)?.token ?? '';
    return (
      <div>
        <h1><i className="fab fa-twitch"/></h1>
        <form>
          <OptionInput initialValue={initialValue} placeholder="token" label="Access Token" onChange={this.onChange} />
          <Box color="yellow" radius="small" padding="small" style={topMarginStyle}>
            <p style={{color: StyleConstants.darkenedTextColor}}><i className="fas fa-exclamation" style={IconStyle}/> Create a token with the scope permission <strong>user_read</strong></p>
          </Box>
          <Button color="black" border borderColor="darkGrey" padding="small" radius="extraSmall" onClick={this.handleOnGenerate} style={topMarginStyle}>
            <i className="fab fa-twitch"></i>
            <span> Generate</span>
          </Button>
        </form>
      </div>
    )
  }
}
