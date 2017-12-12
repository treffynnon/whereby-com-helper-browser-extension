import * as store from './store';
export const getSettings = async () =>
  await store.get(['audio', 'video', 'applyToAllMeetingUrls']);