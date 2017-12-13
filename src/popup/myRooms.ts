import { buildAppearInUrl } from '../utils/appear.in';
import { navigateToRoom } from '../utils/redirect';
import * as store from '../utils/store';

const loadRoomList = async (ul: HTMLUListElement): Promise<HTMLUListElement> => {
  const data = await store.get(['roomList']);
  if (data.roomList && data.roomList.length > 0) {
    ul.innerHTML = '';
    data.roomList.forEach(x => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = buildAppearInUrl(x);
      a.innerText = x;
      li.appendChild(a);
      ul.appendChild(li);
    });
  }
  return ul;
};

const followRoomListLink = async (e): Promise<string | void> => {
  if (e.target.tagName !== 'A') { return; }
  const uri = e.target.getAttribute('href');
  if (uri !== '#') {
    e.preventDefault();
    return await navigateToRoom(new URL(uri));
  }
  return;
};

const roomList = (document.getElementById('my-rooms-list') as HTMLUListElement);
loadRoomList(roomList)
  .then(() => roomList.addEventListener('click', followRoomListLink));
