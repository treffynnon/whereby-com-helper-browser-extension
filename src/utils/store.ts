export const set = data => new Promise((resolve, reject) => {
  chrome.storage.local.set(data, () => resolve(data));
});
export const get = items => new Promise((resolve, reject) => {
  chrome.storage.local.get(items, x => resolve(x));
}) as Promise<{[key: string]: any}>;
