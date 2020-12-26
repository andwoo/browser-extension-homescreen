import React from 'react';
import { Block } from '../../redux/interfaces/StoreModel';
import SortContainer from './SortContainer';
import OptionInput, { IconOptionInput } from './OptionInput';
import Box from '../styled/Box';
import Button from '../styled/Button';
import * as StyleConstants from '../styled/StyleConstants';

interface LauncherOptionsProps {
  save: () => void;
  block: Block;
}

interface LauncherOptionsState {
  icons: LauncherOptionItem[];
  listUpdated: number;
}

interface LauncherOptionItem {
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
  render(): JSX.Element {
    return (
      <div>
        <h1>Launcher</h1>
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
        <Button color="green" padding="small" radius="extraSmall" onClick={this.addBlock}>
          <i className="fas fa-plus"></i>
        </Button>
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
    <Box color="grey" radius="extraSmall" padding="small" key={props.listUpdated} style={marginTopStyle}>
      <SortContainer
        removeBlock={(): void => props.removeBlock(index)}
        moveBlockUp={(): void => props.moveBlockUp(index)}
        moveBlockDown={(): void => props.moveBlockDown(index)}
      >
        <IconOptionInput initialValue={props.data.icon} placeholder={defaultIcon} onChange={(value):void => props.onUpdateBlock(index, value, props.data.href)}/>
        <div style={marginTopStyle}/>
        <OptionInput initialValue={props.data.href} placeholder="https://example.com" label="Url" onChange={(value):void => props.onUpdateBlock(index, props.data.icon, value)}/>
      </SortContainer>
    </Box>
  );
}
