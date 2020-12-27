import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import * as StyleConstants from '../styled/StyleConstants';

const Text = styled.p`
  display: inline-block;
`;
const Input = styled.input`
  width: 100%;
  padding: ${StyleConstants.Paddings.small};
  border-radius: ${StyleConstants.Radii.extraSmall};
  border: 1px solid ${StyleConstants.Colors.darkGrey};
  background-color: ${StyleConstants.Colors.black};

  &[type=text] {
    color: ${StyleConstants.Colors.lightGrey}
  }
  &[type=text]:focus {
    filter: brightness(120%);
  }
  &:hover {
    filter: brightness(160%);
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
        <LayoutItem style={{alignSelf: 'center', marginRight: StyleConstants.Paddings.small}}>
          <Text>{label ?? ''}</Text>
        </LayoutItem>
        <LayoutItem size='full'>
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
        <LayoutItem style={{alignSelf: 'center', marginRight: StyleConstants.Paddings.small}}>
          <i className={value ?? 'fas fa-question'}></i>
        </LayoutItem>
        <LayoutItem size='full'>
          <Input type="text" value={value} placeholder={placeholder} onChange={(event): void => setValue(event.target.value)} />
        </LayoutItem>
      </Layout>
    </label>
  )
}
