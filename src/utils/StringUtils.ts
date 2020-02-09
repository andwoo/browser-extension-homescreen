const parser: DOMParser = new DOMParser();

const isUndefined = (value): boolean => {
  return value === undefined || value === null;
};

export const isString = (value: string): boolean => {
  return !isUndefined(value) && typeof value === 'string';
};

export const IsNullOrEmpty = (value: string): boolean => {
  return isString(value) ? value.length == 0 : isUndefined(value);
};

export const decodeString = (value: string): string => {
  return parser.parseFromString('<!doctype html><body>' + value, 'text/html').body.textContent;
};
