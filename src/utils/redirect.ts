import { getSettings } from './settings';

export const navigateToRoom = async (goTo: URL): Promise<string | void> => {
  const settings = await getSettings();
  goTo.searchParams.delete('audio');
  goTo.searchParams.delete('video');
  if (settings.audio) { goTo.searchParams.append('audio', 'off'); }
  if (settings.video) { goTo.searchParams.append('video', 'off'); }
  return redirect(goTo);
};

const redirect = (location: URL): string | void => chrome.tabs
  ? chrome.tabs.create({
      active: true,
      url: location.toString(),
    })
  : (window.location.href = location.toString());
