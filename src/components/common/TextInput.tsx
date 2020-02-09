import * as React from 'react';

interface TextInputProps {
  label: string;
  value: string;
  onChange(string): void;
}

interface TextInputState {
  value: string;
}

export default class TextInput extends React.PureComponent<TextInputProps, TextInputState> {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }
  componentDidUpdate(previousProps: TextInputProps): void {
    if (previousProps.value != this.props.value) {
      this.setState({ value: this.props.value });
    }
  }
  handOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState(
      {
        value: event.target.value,
      },
      () => this.props.onChange(this.state.value),
    );
  };
  render(): JSX.Element {
    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        <div className="control">
          <input className="input" type="text" value={this.state.value} onChange={this.handOnChange} />
        </div>
      </div>
    );
  }
}
