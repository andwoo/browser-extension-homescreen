import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import * as StyleConstants from '../styled/StyleConstants';

const Text = styled.p`
  margin-right: 2rem;
  display: inline-block;
`;
const Input = styled.input`
  width: 100%;
  padding: ${StyleConstants.Paddings.small};
  border-radius: ${StyleConstants.Radii.extraSmall};
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${StyleConstants.Colors.grey};
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.25);
    filter: brightness(95%);
  }
  &:active {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    filter: brightness(85%);
  }
`;

interface InputProps {
  initialValue: string;
  placeholder: string;
  label?: string;
  onChange: (value: string) => void;
}
const OptionInput = ({initialValue, placeholder, label, onChange}: InputProps): JSX.Element => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <label>
      <Layout>
        <LayoutItem size='one-fifth' style={{alignSelf: 'center'}}>
          <Text>{label ?? ''}</Text>
        </LayoutItem>
        <LayoutItem size='four-fifths'>
          <Input type="text" value={value} placeholder={placeholder} onChange={(event): void => setValue(event.target.value)} />
        </LayoutItem>
      </Layout>
    </label>
  )
}
export default OptionInput

export const IconOptionInput = ({initialValue, placeholder, label, onChange}: InputProps): JSX.Element => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <label>
      <Layout>
        <LayoutItem size='one-fifth' style={{alignSelf: 'center'}}>
          <i className={value ?? 'fas fa-question'}></i>
        </LayoutItem>
        <LayoutItem size='four-fifths'>
          <Input type="text" value={value} placeholder={placeholder} onChange={(event): void => setValue(event.target.value)} />
        </LayoutItem>
      </Layout>
    </label>
  )
}
