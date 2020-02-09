export interface CSGOModel {
  isLoading: boolean;
  error: boolean;
  matches: Array<MatchModel>;
}

export interface MatchModel {
  teamOne: MatchTeam;
  teamTwo: MatchTeam;
  unixTime: string;
  isLive: boolean;
  href: string;
}

export interface MatchTeam {
  name: string;
  thumbnail: string;
}
