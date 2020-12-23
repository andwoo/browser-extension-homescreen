import React from 'react';
import styled from 'styled-components';
import { Block } from '../../redux/interfaces/StoreModel';
import OptionInput from './OptionInput';
import OptionButton from './OptionButton';

const InfoContainer = styled.div`
  background-color: #ffdd57;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  padding: 10px;
`;
const InfoMessage = styled.p`
  color: rgba(0,0,0,0.7);
`;

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
  handleOnGenerate = () => {
    window.open('https://twitchtokengenerator.com/', '_blank');
  }
  render(): JSX.Element {
    const initialValue = (JSON.parse(this.props.block.data) as TwitchOptionState)?.token ?? '';
    return (
      <div>
        <h1>Twitch</h1>
        <form>
          <OptionInput initialValue={initialValue} placeholder="token" label="Access Token" onChange={this.onChange} />
          <InfoContainer>
            <InfoMessage>Create a token with the scope permission <strong>user_read</strong></InfoMessage>
          </InfoContainer>
          <OptionButton variant="default" onClick={this.handleOnGenerate} style={{marginTop: '0.5rem', padding: 10}}>
            <i className="fab fa-twitch"></i>
            <span> Generate</span>
          </OptionButton>
        </form>
      </div>
    )
  }
}
