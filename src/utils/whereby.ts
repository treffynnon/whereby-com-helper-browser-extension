export const isWhereByUri = (uri: string): boolean => /(whereby\.com|appear\.in)\/.+/.test(uri);
export const isStandardUri = (uri: string): boolean => /https?:\/\/(whereby\.com|appear\.in)\//.test(uri);
export const isCorporateSubdomain = (uri: string): boolean => isWhereByUri(uri) && !isStandardUri(uri);
export const isCorporateShortname = (uri: string): boolean => /^[^>]+>.+/.test(uri);
export const whereByUriToRoomName = (uri: string): string => {
  const x = uri.trim();
  return isCorporateSubdomain(x)
    ? x.replace(/^(https?:\/\/)?([^.]+)\.(whereby\.com|appear\.in)\//, '$2 > ')
    : x.replace(/^(https?:\/\/)?(whereby\.com|appear\.in)\//, '');
};
export const buildWhereByUrl = (room: string): string =>
  isCorporateShortname(room)
  ? room.replace(/^([^\s]+) > (.+)/, `https://$1.whereby.com/$2`)
  : `https://whereby.com/${room}`;
