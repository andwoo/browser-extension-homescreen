import Component from '@glimmer/component';
import { ViewBlockArgs } from '../../../content';
import { action } from '@ember/object';
import axios from 'axios';
import { taskFor, perform } from 'ember-concurrency-ts';
import { restartableTask } from 'ember-concurrency';

interface TwitchUserResponse {
  id: string;
  profile_image_url: string;
}

interface TwitchStreamResponse {
  type: string;
  user_login: string;
  user_name: string;
  game_name: string;
  title: string;
  thumbnail_url: string;
  viewer_count: number;
}

interface TwitchStreamer {
  name: string;
  viewers: number;
  game: string;
  title: string;
  url: string;
  thumbnail: string;
}

const ICON_WIDTH = `${1280 / 4}`;
const ICON_HEIGHT = `${800 / 4}`;

export default class ViewTwitchComponent extends Component<ViewBlockArgs> {
  get streamers(): TwitchStreamer[] {
    return taskFor(this.fetchStreamers).lastSuccessful?.value ?? [];
  }

  get isLoading(): boolean {
    return taskFor(this.fetchStreamers).isRunning;
  }

  get isFailure(): boolean {
    return !!taskFor(this.fetchStreamers).lastErrored;
  }

  @action initialize(): void {
    const parsed = JSON.parse(this.args.item.payload ?? '{}');
    perform(this.fetchStreamers, {
      clientId: parsed.clientId ?? '',
      accessToken: parsed.accessToken ?? '',
    });
  }

  @restartableTask async fetchStreamers({
    clientId,
    accessToken,
  }: {
    clientId: string;
    accessToken: string;
  }): Promise<TwitchStreamer[]> {
    const userResponse = await axios.get(`https://api.twitch.tv/helix/users`, {
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': clientId,
      },
    });

    const user: TwitchUserResponse = userResponse.data.data[0];

    const response = await axios.get(
      `https://api.twitch.tv/helix/streams/followed?user_id=${user.id}`,
      {
        headers: {
          Accept: 'application/vnd.twitchtv.v5+json',
          Authorization: `Bearer ${accessToken}`,
          'Client-Id': clientId,
        },
      }
    );

    return response.data.data
      .filter((stream: TwitchStreamResponse) => stream.type === 'live')
      .map((stream: TwitchStreamResponse) => {
        return {
          name: stream.user_name,
          viewers: stream.viewer_count,
          game: stream.game_name,
          title: stream.title,
          url: `https://www.twitch.tv/${stream.user_login}`,
          thumbnail: stream.thumbnail_url
            .replace('{width}', ICON_WIDTH)
            .replace('{height}', ICON_HEIGHT),
        };
      });
  }
}
