export interface EsportEventModel {
  isLoading: boolean;
  error: boolean;
  events: Array<MatchModel>;
}

export interface MatchModel {
  teamOne: MatchTeam;
  teamTwo: MatchTeam;
  time: string;
  isLive: boolean;
  href: string;
}

export interface MatchTeam {
  name: string;
  thumbnail: string;
}

export const defaultModel = {
  isLoading: false,
  error: false,
  events: [],
};
