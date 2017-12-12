export const isAppearInUri = (uri: string): boolean => /appear\.in\/.+/.test(uri);
export const appearInUriToRoomName = (uri: string): string =>
  uri.trim().replace(/^https?:\/\/appear\.in\//, '');
export const buildAppearInUrl = (room: string): string =>
  `https://appear.in/${room}`;