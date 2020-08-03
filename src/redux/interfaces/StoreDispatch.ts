export default interface StoreDispatch {
  LoadOptions: () => void;
  RequestLiveStreams: (accessToken: string) => void;
  RequestSubReddit: (name: string) => void;
  getEsportEvents: (baseUrl: string, endpoint: string) => void;
}
