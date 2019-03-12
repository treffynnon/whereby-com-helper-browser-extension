export const isAppearInUri = (uri: string): boolean => /appear\.in\/.+/.test(uri);
export const appearInUriToRoomName = (uri: string): string =>
  uri.trim().replace(/^(https?:\/\/)?appear\.in\//, '');
export const ensureHttpPrepended = (uri: string): string => {
  const x = uri.trim();
  return (/^https?:\/\//).test(x)
  ? x
  : `https://${x}`;
}
export const buildAppearInUrl = (room: string): string =>
  isAppearInUri(room)
  ? ensureHttpPrepended(room)
  : `https://appear.in/${room}`;
