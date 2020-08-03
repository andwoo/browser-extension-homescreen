export interface EsportEventModel {
  isLoading: boolean;
  error: boolean;
  events: string[];
}

export const defaultModel = {
  isLoading: false,
  error: false,
  events: []
}