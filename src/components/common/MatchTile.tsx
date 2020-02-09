import * as React from 'react';
import * as moment from 'moment';
import { MatchModel } from '../../redux/interfaces/MatchModel';

moment.updateLocale('en', {
  relativeTime: {
    future: '%s',
    past: '%s',
    s: '%s',
    ss: '%ds',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
    d: '%dd',
    dd: '%dd',
    M: '%dm',
    MM: '%dm',
    y: '%dy',
    yy: '%dy',
  },
});

export default class MatchTile extends React.Component<MatchModel> {
  render(): JSX.Element {
    let informationIcon: JSX.Element;
    if (this.props.isLive) {
      informationIcon = (
        <div className="icon--container has-text-right">
          <span className="icon is-small live">
            <i className="far fa-users-crown" aria-hidden="true" />
          </span>
        </div>
      );
    } else {
      informationIcon = (
        <div className="icon--container has-text-right" style={{ fontSize: '1em' }}>
          <strong>{moment.utc(parseInt(this.props.unixTime)).fromNow()}</strong>{' '}
          <i className="far fa-clock" aria-hidden="true" />
        </div>
      );
    }

    return (
      <div className="tile--parent">
        <div className="box is-marginless tile--content">
          <article className="media">
            <a className="dark" href={this.props.href}>
              <div className="media-left">
                <figure className="image is-64x64 is-square">
                  <img
                    className="thumbnail"
                    src={this.props.teamOne.thumbnail || '/resources/anchor.svg'}
                    alt={this.props.teamTwo.name}
                  />
                </figure>
              </div>
            </a>
            <div className="media-content desktop--only">
              <a className="dark" href={this.props.href}>
                <div className="content">
                  <p>
                    <div className="is-divider-vertical" data-content="VS"></div>
                  </p>
                </div>
              </a>
            </div>
            <a className="dark" href={this.props.href}>
              <div className="media-right" style={{ marginRight: '0.5rem' }}>
                <figure className="image is-64x64 is-square">
                  <img
                    className="thumbnail"
                    src={this.props.teamTwo.thumbnail || '/resources/anchor.svg'}
                    alt={this.props.teamTwo.name}
                  />
                </figure>
              </div>
            </a>
            <nav className="level has-text-right icon--container">
              <div className="level-left">
                <a className="dark icon--container" href={this.props.href}>
                  <span className="icon is-small dark">
                    <i className="fad fa-external-link" aria-hidden="true" />
                  </span>
                  <br />
                  {informationIcon}
                </a>
              </div>
            </nav>
          </article>
        </div>
      </div>
    );
  }
}
