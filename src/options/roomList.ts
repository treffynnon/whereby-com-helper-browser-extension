import * as list from '../utils/list';
import { isAppearInUri, appearInUriToRoomName } from '../utils/appear.in';
import { isAbsoluteUri } from '../utils/uri';
import * as store from '../utils/store';

const myRoomsFieldId = 'my-rooms';

const cleanRoom = (room: string): string => {
  const r = room.trim();
  if (isAbsoluteUri(r) && !isAppearInUri(r)) {
    return '';
  } else if (isAppearInUri(r)) {
    return appearInUriToRoomName(r);
  }
  return r;
};

const roomTransducer = (acc: Array<string>, x: string): Array<string> => {
  const cx = cleanRoom(x);
  if (!cx || acc.includes(cx)) return acc;
  return list.push(acc, cx);
};

export const cleanRoomList = (roomList: string): Array<string> =>
  roomList
    .trim()
    .split('\n')
    .reduce(roomTransducer, [])
    .sort();

export const getRoomList = (): Array<string> =>
  cleanRoomList((document.getElementById(myRoomsFieldId) as HTMLTextAreaElement).value);

export const setRoomList = (roomList: Array<string>): void => {
  (document.getElementById(myRoomsFieldId) as HTMLTextAreaElement)
    .value = roomList.join('\n');
};

export const saveRoomList = () => {
  const roomList = getRoomList();
  return store.set({ roomList })
    .then(() => setRoomList(roomList));
};

export const loadRoomList = () => {
  return store.get(['roomList'])
    .then(({ roomList }) => setRoomList(roomList));
};