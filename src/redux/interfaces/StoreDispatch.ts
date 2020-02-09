export default interface StoreDispatch {
  LoadOptions: () => void;
  RequestLiveStreams: (accessToken: string) => void;
  RequestSubReddit: (name: string) => void;
  RequestCSGOMatches: () => void;
}
