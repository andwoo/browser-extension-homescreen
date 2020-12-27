import React from 'react';
import { WarningBox } from '../styled/Box';
import { WarningButton } from '../styled/Button';
import * as StyleConstants from '../styled/StyleConstants';

interface WarningDialog {
  title: string;
  message: string;
}

function handleOnOpenOptions(): void {
  chrome.runtime.openOptionsPage();
}

const WarningDialog = ({title, message}: WarningDialog): JSX.Element => {
  return (
    <WarningBox color="darkBlack">
      <span style={{fontSize: '1.5em'}}>
        <i className="fas fa-exclamation" style={{marginRight: StyleConstants.Paddings.small}}/>
        {title}
      </span>
      <br/>
      <p style={{padding: StyleConstants.Paddings.medium, textAlign: 'center'}}>{message}</p>
      <WarningButton
        icon="fas fa-cog"
        label="Options"
        onClick={handleOnOpenOptions}
        style={{marginTop: StyleConstants.Paddings.small}}
        />
    </WarningBox>
  )
}

export default WarningDialog;
