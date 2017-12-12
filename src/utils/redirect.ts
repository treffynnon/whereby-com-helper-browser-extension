import { getSettings } from './settings';

export const navigateToRoom = async uri => {
  const settings = await getSettings();
  const goTo = new URL(uri);
  goTo.searchParams.delete('audio');
  goTo.searchParams.delete('video');
  if (settings.audio) goTo.searchParams.append('audio', 'off');
  if (settings.video) goTo.searchParams.append('video', 'off');
  return redirect(goTo);
};

const redirect = location => chrome.tabs
  ? chrome.tabs.create({
      url: location.toString(),
      active: true,
    })
  : (window.location.href = location.toString());