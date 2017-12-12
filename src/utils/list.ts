export const unique = (arr: Array<any>): Array<any> =>
  Array.from(new Set(arr));

export const push = (arr: Array<any>, val: any): Array<any> => {
  arr.push(val);
  return arr;
};