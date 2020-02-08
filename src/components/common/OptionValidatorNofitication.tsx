import * as React from 'react';

export interface OptionValidatorProps {
  isLoading: boolean;
  validate: boolean;
  description: string;
}

interface OptionValidatorState {
  isVisible: boolean;
}

export default class OptionValidatorNotification extends React.Component<OptionValidatorProps, OptionValidatorState> {
  onHideNotification = (): void => {
    this.setState({ isVisible: false });
  };
  onOpenOptions = (): void => {
    chrome.runtime.openOptionsPage();
  };
  render(): JSX.Element {
    if (this.props.isLoading) {
      return this.renderLoading();
    } else {
      return this.props.validate ? <div>{this.props.children}</div> : this.renderFailedValidation();
    }
  }
  renderLoading = (): JSX.Element => {
    return <div className="notification">Loading</div>;
  };
  renderFailedValidation = (): JSX.Element => {
    return (
      <div className="notification is-warning">
        {this.props.description}
        <br />
        <br />
        <button className="button is-warning is-light" onClick={this.onOpenOptions}>
          Options
        </button>
      </div>
    );
  };
}
