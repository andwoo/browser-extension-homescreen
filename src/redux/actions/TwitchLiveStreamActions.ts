import axios from 'axios';
import BaseAction from '../interfaces/BaseAction';
import TwitchStream from '../interfaces/TwitchStream';

export interface TwitchStreamsAction extends BaseAction {
  streams: Array<TwitchStream>;
}

export const ActionTypes = {
  REQUESTING_LIVE_STREAMS: 'REQUESTING_LIVE_STREAMS',
  REQUESTING_LIVE_STREAMS_SUCCESS: 'REQUESTING_LIVE_STREAMS_SUCCESS',
  REQUESTING_LIVE_STREAMS_FAIL: 'REQUESTING_LIVE_STREAMS_FAIL',
};

const GetTwitchLiveStreams = async (accessToken: string): Promise<Array<TwitchStream>> => {
  let streams: Array<TwitchStream> = [];
  try {
    const followsResponse = await axios.get('https://api.twitch.tv/kraken/streams/followed?stream_type=live', {
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `OAuth ${accessToken}`,
      },
    });

    streams = followsResponse.data.streams.map(stream => {
      return {
        name: stream['channel'].display_name,
        viewers: stream.viewers,
        game: stream['channel'].game,
        href: stream['channel'].url,
        thumbnail: stream['channel'].logo,
        background: stream['channel'].profile_banner,
        backgroundColour: stream['channel'].profile_banner_background_color,
      };
    });
  } catch (error) {
    return Promise.reject(new Error(error));
  }
  return streams;
};

function RequestingLiveStreams(): BaseAction {
  return {
    type: ActionTypes.REQUESTING_LIVE_STREAMS,
  };
}

function RequestedLiveStreamsSuccess(streams: Array<TwitchStream>): TwitchStreamsAction {
  return {
    type: ActionTypes.REQUESTING_LIVE_STREAMS_SUCCESS,
    streams: streams,
  };
}

function RequestedLiveStreamsFail(): BaseAction {
  return {
    type: ActionTypes.REQUESTING_LIVE_STREAMS_FAIL,
  };
}

export function RequestLiveStreams(accessToken: string) {
  return (dispatch): Promise<Array<TwitchStream>> => {
    dispatch(RequestingLiveStreams());
    return GetTwitchLiveStreams(accessToken).then(
      streams => dispatch(RequestedLiveStreamsSuccess(streams)),
      () => dispatch(RequestedLiveStreamsFail()),
    );
  };
}
