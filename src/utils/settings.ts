import * as store from './store';

export interface ISettings {
  [key: string]: any;
}

export const getSettings = async (): Promise<ISettings> =>
  await store.get(['audio', 'video', 'applyToAllMeetingUrls']);
