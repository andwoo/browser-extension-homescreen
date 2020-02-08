export const mergeArrays = (source: Array<string>, mergeWith: Array<string>): Array<string> => {
  const merged: Array<string> = [...source];
  for (let i = 0; i < merged.length && i < mergeWith.length; ++i) {
    merged[i] = mergeWith[i];
  }
  return merged;
};
