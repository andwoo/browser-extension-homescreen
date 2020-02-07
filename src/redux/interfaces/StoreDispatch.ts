export default interface StoreDispatch {
  LoadOptions: () => void;
  RequestLiveStreams: (accessToken: string) => void;
}
