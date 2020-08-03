/* eslint-disable prettier/prettier */
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import * as $ from 'jquery';
import * as moment from 'moment';
import { Dispatch } from 'redux';
import BaseAction from '../interfaces/BaseAction';
import { MatchModel } from '../interfaces/EsportEventModel';

moment.updateLocale('en', {
  relativeTime: {
    future: '%s',
    past: '%s',
    s: '%s',
    ss: '%ds',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
    d: '%dd',
    dd: '%dd',
    M: '%dm',
    MM: '%dm',
    y: '%dy',
    yy: '%dy',
  },
});

export interface EsportEventsAction extends BaseAction {
  events: Array<MatchModel>;
}

export const ActionTypes = {
  REQUESTING_ESP_EVENTS: 'REQUESTING_ESP_EVENTS',
  REQUESTING_ESP_EVENTS_SUCCESS: 'REQUESTING_ESP_EVENTS_SUCCESS',
  REQUESTING_ESP_EVENTS_FAIL: 'REQUESTING_ESP_EVENTS_FAIL',
};

async function getUrlData(baseUrl: string, endpoint: string): Promise<string> {
  const response = await axios.get(`${baseUrl}/${endpoint}`, { responseType: 'text', adapter: jsonpAdapter });
  return Promise.resolve(response.data);
}

async function stringToHtml(value: string): Promise<JQuery<HTMLElement>> {
  return new Promise((resolve, reject) => {
    try {
      const html: JQuery<HTMLElement> = $('<div>').html(value);
      html.ready(() => resolve(html));
    } catch (exception) {
      reject(exception)
    }
  });
}

function parseHtmlToEvents(baseUrl: string, html: JQuery<HTMLElement>): Array<MatchModel> {

  return Array.from(html[0].getElementsByClassName("match-item")).map((element: Element, index: number) => {
    const teamIcon = element.getElementsByClassName("match-item-icon")[0].getElementsByTagName("img")[0].getAttribute("src");
    const time = element.getElementsByClassName("ml-eta")?.[0]?.textContent?.trim();
    const teams = Array.from(element.getElementsByClassName("match-item-vs")[0].getElementsByClassName("match-item-vs-team")).map((element: Element, index: number) => {
      return {
        name: element.getElementsByClassName("text-of")[0].textContent.trim(),
        thumbnail: teamIcon.includes('//') ? `https:${teamIcon}` : `${baseUrl}${teamIcon}`
      }
    });

    return {
      teamOne: teams[0],
      teamTwo: teams[1],
      isLive: false,
      time: time ?? "TBD",
      href: `${baseUrl}${element.getAttribute('href')}`,
    };
  })
}

export function getEsportEvents(baseUrl: string, endpoint: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    let events: Array<MatchModel> = [];
    dispatch({ type: ActionTypes.REQUESTING_ESP_EVENTS });
    try {
      const data: string = await getUrlData(baseUrl, endpoint);
      const html: JQuery<HTMLElement> = await stringToHtml(data);
      events = parseHtmlToEvents(baseUrl, html);
    } catch (exception) {
      dispatch({ type: ActionTypes.REQUESTING_ESP_EVENTS_FAIL, events: events });
      return;
    }
    dispatch({ type: ActionTypes.REQUESTING_ESP_EVENTS_SUCCESS, events: events });
  };
}
