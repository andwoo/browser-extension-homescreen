import React from 'react';
import styled from 'styled-components';
import { Block } from '../../redux/interfaces/StoreModel';
import SortContainer from './SortContainer';
import OptionInput, { IconOptionInput } from './OptionInput';
import OptionButton from './OptionButton';

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

const addButtonStyle: React.CSSProperties = {
  padding: 10
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
  addBlock = () => {
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
        <OptionButton variant="success" onClick={this.addBlock} style={addButtonStyle} >
          <i className="fas fa-plus"></i>
        </OptionButton>
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

const IconContainer = styled.div`
  background-color: #f7f7f7;
  border-radius: 5px;
  margin-bottom: 1rem;
  padding-bottom: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const LauncherIcon = (props: LauncherIconProps): JSX.Element => {
  const index = props.index;
  return (
    <IconContainer key={props.listUpdated}>
      <SortContainer
        removeBlock={(): void => props.removeBlock(index)}
        moveBlockUp={(): void => props.moveBlockUp(index)}
        moveBlockDown={(): void => props.moveBlockDown(index)}
      >
        <IconOptionInput initialValue={props.data.icon} placeholder={defaultIcon} onChange={(value):void => props.onUpdateBlock(index, value, props.data.href)}/>
        <OptionInput initialValue={props.data.href} placeholder="https://example.com" label="Url" onChange={(value):void => props.onUpdateBlock(index, props.data.icon, value)}/>
      </SortContainer>
    </IconContainer>
  );
}
