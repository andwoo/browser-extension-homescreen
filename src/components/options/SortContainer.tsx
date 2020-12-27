import React from 'react';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
import { ErrorButton, RegularButton } from '../styled/Button';
import * as StyleConstants from '../styled/StyleConstants';

interface SortContainerProps {
  icon?: string;
  children?: React.ReactNode,
  removeBlock: () => void;
  moveBlockUp: () => void;
  moveBlockDown: () => void;
}

const buttonSize = '1em';
const removeStyle: React.CSSProperties = {
  width: buttonSize,
  height: buttonSize,
  padding: 0
};

const arrowUpStyle: React.CSSProperties = {
  width: buttonSize,
  height: buttonSize,
  padding: 0,
  borderTopLeftRadius: StyleConstants.Radii.extraSmall,
  borderTopRightRadius: StyleConstants.Radii.extraSmall,
};

const arrowDownStyle: React.CSSProperties = {
  width: buttonSize,
  height: buttonSize,
  padding: 0,
  borderBottomLeftRadius: StyleConstants.Radii.extraSmall,
  borderBottomRightRadius: StyleConstants.Radii.extraSmall,
};

const ButtonContainer = (props: SortContainerProps): JSX.Element => {
  return (
    <Layout direction="column" style={{marginBottom: StyleConstants.Paddings.small, justifyContent: 'flex-end'}}>
      {
      props.icon && (
        <>
          <LayoutItem>
            <i className={props.icon}/>
          </LayoutItem>
          <LayoutItem style={{flexGrow: 1}}/>
        </>
      )
      }
      <LayoutItem>
        <RegularButton border={false} color={"darkBlack"} icon="fas fa-angle-up" onClick={props.moveBlockUp} style={arrowUpStyle}/>
      </LayoutItem>
      <LayoutItem>
        <RegularButton border={false} color={"darkBlack"} icon="fas fa-angle-down" onClick={props.moveBlockDown} style={arrowDownStyle}/>
      </LayoutItem>
      <LayoutItem>
        <div style={{width: StyleConstants.Paddings.small, height: StyleConstants.Paddings.small}}/>
      </LayoutItem>
      <LayoutItem>
        <ErrorButton border={false} color={"darkBlack"} icon="fas fa-times" onClick={props.removeBlock} style={removeStyle}/>
      </LayoutItem>


    </Layout>
  );
}

const SortContainer = (props: SortContainerProps): JSX.Element => {
  return (
    <Layout direction="row">
      <LayoutItem stretch>
        <ButtonContainer {...props}/>
      </LayoutItem>
      <LayoutItem stretch size='full'>
        {props.children}
      </LayoutItem>
    </Layout>
  );
}
export default SortContainer


