import * as React from 'react';
import { MatchModel } from '../../redux/interfaces/EsportEventModel';
import { getImageOrDefault } from '../../utils/ImageUtils';

export interface MatchTileProps extends MatchModel {
  defaultTopIcon: string;
  activeTopIcon: string;
  isActive: boolean;
}

export default class MatchTile extends React.Component<MatchTileProps> {
  render(): JSX.Element {
    return (
      <div className="tile--parent">
        <div className="box is-marginless tile--content">
          <article className="media">
            <a className="dark" href={this.props.href}>
              <div className="media-left">
                <figure className="image is-64x64 is-square">
                  <img
                    className="thumbnail"
                    src={getImageOrDefault(this.props.teamOne.thumbnail)}
                    alt={this.props.teamOne.name}
                    title={this.props.teamOne.name}
                  />
                </figure>
              </div>
            </a>
            <div className="media-content desktop--only">
              <a className="dark" href={this.props.href}>
                <div className="content">
                  <div
                    className="is-divider-vertical "
                    data-content={this.props.isActive ? 'VS' : this.props.time}
                  ></div>
                </div>
              </a>
            </div>
            <a className="dark" href={this.props.href}>
              <div className="media-right" style={{ marginRight: '0.5rem' }}>
                <figure className="image is-64x64 is-square">
                  <img
                    className="thumbnail"
                    src={getImageOrDefault(this.props.teamTwo.thumbnail)}
                    alt={this.props.teamTwo.name}
                    title={this.props.teamTwo.name}
                  />
                </figure>
              </div>
            </a>
            <nav className="level is-mobile">
              <div className="level-left">
                <a href={this.props.href}>
                  <span className={`icon is-small ${this.props.isActive ? 'activeIcon' : 'dark'}`}>
                    <i
                      className={this.props.isActive ? this.props.activeTopIcon : this.props.defaultTopIcon}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </div>
            </nav>
          </article>
        </div>
      </div>
    );
  }
}
