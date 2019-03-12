export const isAppearInUri = (uri: string): boolean => /appear\.in\/.+/.test(uri);
export const isStandardUri = (uri: string): boolean => /https?:\/\/appear.in\//.test(uri);
export const isCorporateSubdomain = (uri: string): boolean => isAppearInUri(uri) && !isStandardUri(uri);
export const isCorporateShortname = (uri: string): boolean => /^[^>]+>.+/.test(uri);
export const appearInUriToRoomName = (uri: string): string => {
  const x = uri.trim();
  return isCorporateSubdomain(x)
    ? x.replace(/^(https?:\/\/)?([^.]+)\.appear\.in\//, '$2 > ')
    : x.replace(/^(https?:\/\/)?appear\.in\//, '');
};
export const buildAppearInUrl = (room: string): string =>
  isCorporateShortname(room)
  ? room.replace(/^([^\s]+) > (.+)/, `https://$1.appear.in/$2`)
  : `https://appear.in/${room}`;
