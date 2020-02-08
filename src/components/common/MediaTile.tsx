import * as React from 'react';

export interface MediaTileProps {
  href: string;
  thumbnail: string;
}

export default class MediaTile extends React.Component<MediaTileProps> {
  render(): JSX.Element {
    return (
      <div className="tile--parent">
        <div className="box is-marginless tile--content">
          <a className="dark" href={this.props.href}>
            <article className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  <img className="rounded" src={this.props.thumbnail} alt="Image" />
                </figure>
              </div>
              <div className="media-content">
                <div className="content">{this.props.children}</div>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item" aria-label="reply">
                    <span className="icon is-small dark">
                      <i className="fad fa-external-link" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>
              </nav>
            </article>
          </a>
        </div>
      </div>
    );
  }
}
