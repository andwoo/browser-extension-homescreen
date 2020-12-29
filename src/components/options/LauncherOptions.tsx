import React from 'react';
import { Block } from '../../redux/interfaces/StoreModel';
import SortContainer from './SortContainer';
import OptionInput, { IconOptionInput } from './OptionInput';
import { TransparentBox } from '../styled/Box';
import { SuccessButton, PinkButton } from '../styled/Button';
import * as StyleConstants from '../styled/StyleConstants';

interface LauncherOptionsProps {
  save: () => void;
  block: Block;
}

export interface LauncherOptionsState {
  icons: LauncherOptionItem[];
  listUpdated: number;
}

export interface LauncherOptionItem {
  icon: string;
  href: string;
}

const defaultIcon = 'fas fa-question';

export function dataToString(): string {
  return JSON.stringify({icons: this?.state?.icons ?? []});
}

export default class LauncherOption extends React.Component<LauncherOptionsProps, LauncherOptionsState> {
  constructor(props) {
    super(props);
    this.dataToString = dataToString.bind(this);
    this.state = {
      icons: [],
      listUpdated: 0
    }
  }
  componentDidMount():void {
    this.setState({
      icons: (JSON.parse(this.props.block.data) as LauncherOptionsState)?.icons ?? [...this.state.icons]
    });
  }
  dataToString = (): string => {
    return dataToString.call(this);
  };
  addBlock = (): void => {
    this.setState({
      icons: [...this.state.icons, ...[{icon: defaultIcon, href: ''}]],
      listUpdated: Date.now()
    }, () => this.props.save());
  }
  onUpdateBlock = (index: number, icon: string, href: string): void => {
    if(index >= 0 && index < this.state.icons.length) {
      const icons = [...this.state.icons];
      icons[index].icon = icon;
      icons[index].href = href;
      this.setState({
        icons: icons
      });
    }
  }
  removeBlock = (index: number): void => {
    if(index >= 0 && index < this.state.icons.length) {
      const icons = [...this.state.icons];
      icons.splice(index, 1);
      this.setState({
        icons: icons,
        listUpdated: Date.now()
      }, () => this.props.save());
    }
  };
  moveBlockUp = (index: number): void => {
    if(index > 0 && index < this.state.icons.length) {
      const icons = [...this.state.icons];
      icons.splice(index - 1, 2, icons[index], icons[index -1]);
      this.setState({
        icons: icons,
        listUpdated: Date.now()
      }, () => this.props.save());
    }
  };
  moveBlockDown = (index: number): void => {
    if(index >= 0 && index < this.state.icons.length - 1) {
      const icons = [...this.state.icons];
      icons.splice(index, 2, icons[index + 1], icons[index]);
      this.setState({
        icons: icons,
        listUpdated: Date.now()
      }, () => this.props.save());
    }
  };
  handleOnGetIcon = (): void => {
    window.open('https://fontawesome.com/icons?d=gallery', '_blank');
  }
  render(): JSX.Element {
    return (
      <div style={{maxHeight: '500px', overflow: 'auto'}}>
        {this.state.icons.map((value, index) =>
          <LauncherIcon
            listUpdated={this.state.listUpdated}
            key={index}
            data={value}
            index={index}
            onUpdateBlock={this.onUpdateBlock}
            removeBlock={this.removeBlock}
            moveBlockUp={this.moveBlockUp}
            moveBlockDown={this.moveBlockDown} />
        )}
        <SuccessButton icon="fas fa-plus" label="Add" onClick={this.addBlock} style={{marginBottom: StyleConstants.Paddings.small}}/>
        <PinkButton icon="fas fa-flag" label="Get Icon" onClick={this.handleOnGetIcon}/>
      </div>
    )
  }
}

interface LauncherIconProps {
  listUpdated: number;
  data: LauncherOptionItem;
  index: number;
  onUpdateBlock: (index: number,  icon: string, href: string) => void;
  removeBlock: (index: number) => void;
  moveBlockUp: (index: number) => void;
  moveBlockDown: (index: number) => void;
}

const marginTopStyle: React.CSSProperties = {
  marginBottom: StyleConstants.Paddings.small
}

const LauncherIcon = (props: LauncherIconProps): JSX.Element => {
  const index = props.index;
  return (
    <TransparentBox key={props.listUpdated} style={marginTopStyle}>
      <SortContainer
        removeBlock={(): void => props.removeBlock(index)}
        moveBlockUp={(): void => props.moveBlockUp(index)}
        moveBlockDown={(): void => props.moveBlockDown(index)}
      >
        <IconOptionInput initialValue={props.data.icon} placeholder={defaultIcon} onChange={(value):void => props.onUpdateBlock(index, value, props.data.href)}/>
        <div style={marginTopStyle}/>
        <OptionInput initialValue={props.data.href} placeholder="https://example.com" label="Url" onChange={(value):void => props.onUpdateBlock(index, props.data.icon, value)}/>
      </SortContainer>
    </TransparentBox>
  );
}
