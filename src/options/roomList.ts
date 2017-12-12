import { appearInUriToRoomName, isAppearInUri } from '../utils/appear.in';
import * as list from '../utils/list';
import * as store from '../utils/store';
import { isAbsoluteUri } from '../utils/uri';

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

const roomTransducer = (acc: string[], x: string): string[] => {
  const cx = cleanRoom(x);
  if (!cx || acc.includes(cx)) { return acc; }
  return list.push(acc, cx);
};

export const cleanRoomList = (roomList: string): string[] =>
  roomList
    .trim()
    .split('\n')
    .reduce(roomTransducer, [])
    .sort();

export const getRoomList = (): string[] =>
  cleanRoomList((document.getElementById(myRoomsFieldId) as HTMLTextAreaElement).value);

export const setRoomList = (roomList: string[]): string[] => {
  (document.getElementById(myRoomsFieldId) as HTMLTextAreaElement)
    .value = roomList.join('\n');
  return roomList;
};

export const saveRoomList = (): Promise<string[]> => {
  const roomList = getRoomList();
  return store.set({ roomList })
    .then(() => setRoomList(roomList));
};

export const loadRoomList = (): Promise<string[]> => {
  return store.get(['roomList'])
    .then(({ roomList }) => setRoomList(roomList));
};
