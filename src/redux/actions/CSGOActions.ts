import axios from 'axios';
import * as $ from 'jquery';
import BaseAction from '../interfaces/BaseAction';
import { MatchModel } from '../interfaces/MatchModel';

export interface GetMatchesAction extends BaseAction {
  matches: Array<MatchModel>;
}

export const ActionTypes = {
  REQUESTING_CSGO_MATCHES: 'REQUESTING_CSGO_MATCHES',
  REQUESTING_CSGO_MATCHES_SUCCESS: 'REQUESTING_CSGO_MATCHES_SUCCESS',
  REQUESTING_CSGO_MATCHES_FAIL: 'REQUESTING_CSGO_MATCHES_FAIL',
};

const extractTeamTitle = (node: Element): string => {
  if (!node) {
    return '?';
  }
  return node.getAttribute('title');
};

const extractTeamThumbnail = (node: Element): string => {
  if (!node) {
    return null;
  }
  return node.getAttribute('src');
};

const Getmatches = async (): Promise<Array<MatchModel>> => {
  const matches: Array<MatchModel> = [];
  try {
    const response = await axios.get('https://www.hltv.org/matches', { responseType: 'text' });
    const html: HTMLElement = $('<div>').html(response.data)[0];

    const liveMatches = html.getElementsByClassName('live-match');
    if (liveMatches && liveMatches.length > 0) {
      for (let i = 0; i < liveMatches.length; ++i) {
        const teamCells = liveMatches[i].getElementsByClassName('teams');
        if (!teamCells || teamCells.length < 2) {
          continue;
        }

        const match: MatchModel = {
          teamOne: {
            name: extractTeamTitle(teamCells[0].getElementsByClassName('logo')[0]),
            thumbnail: extractTeamThumbnail(teamCells[0].getElementsByClassName('logo')[0]),
          },
          teamTwo: {
            name: extractTeamTitle(teamCells[1].getElementsByClassName('logo')[0]),
            thumbnail: extractTeamThumbnail(teamCells[1].getElementsByClassName('logo')[0]),
          },
          isLive: true,
          unixTime: '',
          href: `https://www.hltv.org${liveMatches[i].getElementsByTagName('a')[0].getAttribute('href')}`,
        };
        matches.push(match);
      }
    }

    const upcomingMatches = html.getElementsByClassName('upcoming-match');
    if (upcomingMatches && upcomingMatches.length > 0) {
      for (let i = 0; i < upcomingMatches.length; ++i) {
        const teamCells = upcomingMatches[i].getElementsByClassName('team-cell');
        if (!teamCells || teamCells.length < 2) {
          continue;
        }

        const match: MatchModel = {
          teamOne: {
            name: extractTeamTitle(teamCells[0].getElementsByClassName('logo')[0]),
            thumbnail: extractTeamThumbnail(teamCells[0].getElementsByClassName('logo')[0]),
          },
          teamTwo: {
            name: extractTeamTitle(teamCells[1].getElementsByClassName('logo')[0]),
            thumbnail: extractTeamThumbnail(teamCells[1].getElementsByClassName('logo')[0]),
          },
          isLive: false,
          unixTime: upcomingMatches[i].getElementsByClassName('time')[1].getAttribute('data-unix'),
          href: `https://www.hltv.org${upcomingMatches[i].getElementsByTagName('a')[0].getAttribute('href')}`,
        };
        matches.push(match);
      }
    }
  } catch (error) {
    return Promise.reject(new Error(error));
  }
  return matches;
};

function RequestingCSGOMatches(): BaseAction {
  return {
    type: ActionTypes.REQUESTING_CSGO_MATCHES,
  };
}

function RequestingCSGOMatchesSuccess(matches: Array<MatchModel>): GetMatchesAction {
  return {
    type: ActionTypes.REQUESTING_CSGO_MATCHES_SUCCESS,
    matches: matches,
  };
}

function RequestingCSGOMatchesFail(): BaseAction {
  return {
    type: ActionTypes.REQUESTING_CSGO_MATCHES_FAIL,
  };
}

export function RequestCSGOMatches() {
  return (dispatch): Promise<Array<MatchModel>> => {
    dispatch(RequestingCSGOMatches());
    return Getmatches().then(
      matches => dispatch(RequestingCSGOMatchesSuccess(matches)),
      () => dispatch(RequestingCSGOMatchesFail()),
    );
  };
}
