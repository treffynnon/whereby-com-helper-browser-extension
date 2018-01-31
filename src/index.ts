import { navigateToRoom } from './utils/redirect';
import { getSettings } from './utils/settings';

sessionStorage.removeItem('muteStatus');

getSettings()
  .then(settings => {
    if (settings.applyToAllMeetingUrls
        || settings.applyToAllMeetingUrls === undefined) {
      const status = {
        localAudioMuted: false,
        localVideoMuted: false,
      };
      if (settings.video) {
        status.localVideoMuted = true;
      }
      if (settings.audio) {
        status.localAudioMuted = true;
      }
      sessionStorage.setItem('muteStatus', JSON.stringify(status));
    }
  });
