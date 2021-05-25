import Component from '@glimmer/component';
import { ViewBlockArgs } from '../../../content';
import { action } from '@ember/object';
import axios from 'axios';
import { taskFor, perform } from 'ember-concurrency-ts';
import { restartableTask, TaskGenerator } from 'ember-concurrency';

interface TwitchStreamerResponse {
  channel: {
    display_name: string;
    game: string;
    logo: string;
    url: string;
    profile_banner: string;
    profile_banner_background_color: string;
  };
  viewers: string;
}

interface TwitchStreamer {
  name: string;
  viewers: string;
  game: string;
  url: string;
  thumbnail: string;
  background: string;
  backgroundColour: string;
}

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
    const accessToken: string = parsed.accessToken ?? '';
    perform(this.fetchStreamers, accessToken);
  }

  @restartableTask *fetchStreamers(
    accessToken: string
  ): TaskGenerator<TwitchStreamer[]> {
    const response = yield axios.get(
      'https://api.twitch.tv/kraken/streams/followed?stream_type=live',
      {
        headers: {
          Accept: 'application/vnd.twitchtv.v5+json',
          Authorization: `OAuth ${accessToken}`,
        },
      }
    );

    return response.data.streams.map((stream: TwitchStreamerResponse) => {
      return {
        name: stream['channel'].display_name,
        viewers: stream.viewers,
        game: stream['channel'].game,
        url: stream['channel'].url,
        thumbnail: stream['channel'].logo,
        background: stream['channel'].profile_banner,
        backgroundColour: stream['channel'].profile_banner_background_color,
      };
    });
  }
}
