import { navigateToRoom } from './utils/redirect';
import { getSettings } from './utils/settings';
const loc = new URL(window.location.href);

const has = (url: URL, param: string) =>
  url.searchParams.has(param) && url.searchParams.get(param) === 'off';

getSettings()
  .then(settings => {
    if (settings.applyToAllMeetingUrls
        || settings.applyToAllMeetingUrls === undefined) {
      const urlDefects = [
        settings.audio && !has(loc, 'audio'),
        !settings.audio && has(loc, 'audio'),
        settings.video && !has(loc, 'video'),
        !settings.video && has(loc, 'video'),
      ];
      if (urlDefects.filter(x => x).length > 0) {
        navigateToRoom(loc);
      }
    }
  });