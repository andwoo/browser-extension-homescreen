import React from 'react';
import { Block } from '../../redux/interfaces/StoreModel';
import OptionInput from './OptionInput';
import Box from '../styled/Box';
import { PurpleButton } from '../styled/Button';
import * as StyleConstants from '../styled/StyleConstants';

const IconStyle: React.CSSProperties = {
  marginRight: StyleConstants.Paddings.small
}
const InfoStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: StyleConstants.Paddings.small,
  paddingTop: StyleConstants.Paddings.large,
  paddingBottom: StyleConstants.Paddings.large,
}

interface TwitchOptionProps {
  save: () => void;
  block: Block;
}

export interface TwitchOptionState {
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
      <form>
        <OptionInput initialValue={initialValue} placeholder="token" label="Token" onChange={this.onChange} />
        <Box color="yellow" border borderColor="lightYellow" radius="small" padding="small" style={InfoStyle}>
          <p style={{color: StyleConstants.Colors.yellowText}}><i className="fas fa-exclamation" style={IconStyle}/> Generate a token with the scope permission <strong>user_read</strong></p>
        </Box>
        <PurpleButton icon="fab fa-twitch" label="Generate" onClick={this.handleOnGenerate} style={{marginTop: StyleConstants.Paddings.small}}/>
      </form>
    )
  }
}
