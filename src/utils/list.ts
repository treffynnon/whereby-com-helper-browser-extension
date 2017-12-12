export const unique = (arr: any[]): any[] =>
  Array.from(new Set(arr));

export const push = (arr: any[], val: any): any[] => {
  arr.push(val);
  return arr;
};
