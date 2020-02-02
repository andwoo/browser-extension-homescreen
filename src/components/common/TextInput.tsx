import * as React from 'react';

interface TextInputProps {
  label: string;
  value: string;
  onChange(string): void;
}

export default class TextInput extends React.PureComponent<TextInputProps> {
  handOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(event.target.value);
  };
  render(): JSX.Element {
    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        <div className="control">
          <input className="input" type="text" value={this.props.value} onChange={this.handOnChange} />
        </div>
      </div>
    );
  }
}
