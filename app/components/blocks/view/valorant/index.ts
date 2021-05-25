import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ViewBlockArgs } from '../../../content';
import { action } from '@ember/object';
import axios from 'axios';
import { taskFor, perform } from 'ember-concurrency-ts';
import { restartableTask, TaskGenerator } from 'ember-concurrency';
import { isEmpty } from '@ember/utils';
import jQuery from 'jquery';

interface Match {
  teamOne: string;
  teamTwo: string;
  isLive: boolean;
  time: string;
  thumbnail: string;
  url: string;
}

export default class ViewValorantComponent extends Component<ViewBlockArgs> {
  @tracked reddit: string = '';

  get matches(): Match[] {
    return taskFor(this.fetchMatches).lastSuccessful?.value ?? [];
  }

  get isLoading(): boolean {
    return taskFor(this.fetchMatches).isRunning;
  }

  get isFailure(): boolean {
    return !!taskFor(this.fetchMatches).lastErrored;
  }

  @action initialize(): void {
    perform(this.fetchMatches);
  }

  @restartableTask *fetchMatches(): TaskGenerator<Match[]> {
    const response = yield axios.get('https://www.vlr.gg/matches', {
      responseType: 'text',
    });
    //@ts-ignore
    let html = jQuery('<div>').html(response.data);
    //@ts-ignore
    html = yield html.ready();
    return Array.from(html[0].getElementsByClassName('match-item')).map(
      (element: Element) => {
        const thumbnail = element
          .getElementsByClassName('match-item-icon')[0]
          .getElementsByTagName('img')[0]
          .getAttribute('src');
        const time = element
          .getElementsByClassName('ml-eta')?.[0]
          ?.textContent?.trim();
        const isLive =
          element
            .getElementsByClassName('ml-status')?.[0]
            ?.textContent?.trim()
            ?.toLowerCase?.() === 'live';
        const teams = Array.from(
          element
            .getElementsByClassName('match-item-vs')[0]
            .getElementsByClassName('match-item-vs-team')
        ).map((element: Element) =>
          element.getElementsByClassName('text-of')[0].textContent.trim()
        );

        return {
          teamOne: teams[0],
          teamTwo: teams[1],
          thumbnail: thumbnail?.includes('//')
            ? `https:${thumbnail}`
            : `https://www.vlr.gg${thumbnail}`,
          isLive: isLive,
          time: time ?? 'TBD',
          url: `https://www.vlr.gg${element.getAttribute('href')}`,
        };
      }
    );
  }

  @action onLaunchMatchUrl(match: Match): void {
    if (!isEmpty(match.url)) {
      window.open(match.url, '_blank');
    }
  }
}
