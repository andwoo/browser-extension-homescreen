import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import * as $ from 'jquery';
import { Dispatch } from 'redux';
import BaseAction from '../interfaces/BaseAction';

export interface EsportEventsAction extends BaseAction {
  events: string[];
}

export const ActionTypes = {
  REQUESTING_ESP_EVENTS: 'REQUESTING_ESP_EVENTS',
  REQUESTING_ESP_EVENTS_SUCCESS: 'REQUESTING_ESP_EVENTS_SUCCESS',
  REQUESTING_ESP_EVENTS_FAIL: 'REQUESTING_ESP_EVENTS_FAIL',
};

export function getEsportEvents(url: string) {
  return async (dispatch: Dispatch): Promise<EsportEventsAction> => {
    console.log('yuh');
    let events: string[];
    dispatch({ type: ActionTypes.REQUESTING_ESP_EVENTS });
    try {
      const data: string = await getUrlData(url);
      const html: JQuery<HTMLElement> = await stringToHtml(data);
      events = parseHtmlToLiveEvents(html);
    } catch (exception) {
      console.log(`failed ${exception}`);
      return { type: ActionTypes.REQUESTING_ESP_EVENTS_FAIL, events: events };
    }
    console.log(`success [${events.toString()}]`);
    return { type: ActionTypes.REQUESTING_ESP_EVENTS_SUCCESS, events: events };
  }
}

async function getUrlData(url: string): Promise<string> {
  const response = await axios.get(url, { responseType: 'text', adapter: jsonpAdapter });
  return Promise.resolve(response.data);
}

async function stringToHtml(value: string): Promise<JQuery<HTMLElement>> {
  const html: JQuery<HTMLElement> = $('<div>').html(value);
  return Promise.resolve(html);
}

const CLASSNAME_LIVE_CONTAINER = "#Live Now";
const CLASSNAME_LIVE_ELEMENT_CONTAINER = ".juked174";
const CLASSNAME_LIVE_ELEMENT_GAME = ".juked195";
function parseHtmlToLiveEvents(html: JQuery<HTMLElement>): string[] {
  //id Live Now
  const liveNode: JQuery<HTMLElement> = $
    (CLASSNAME_LIVE_CONTAINER, html);

  return [];
  // return $(CLASSNAME_LIVE_ELEMENT_CONTAINER, liveNode).toArray().map((element: HTMLElement, index: number) => element.nodeValue)
  //.toArray().map((node: HTMLElement, index: number) => `y ${index}`);
  // const liveNode: Element = html("#Live Now");
  // return [liveNode.getElementsByClassName('juked584')[0].innerHTML]
}

