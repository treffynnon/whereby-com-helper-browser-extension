import { loadApplyToAllMeetingUrls, saveApplyToAllMeetingUrls } from './applyToAllMeetingUrls';
import { loadRoomList, saveRoomList } from './roomList';

loadRoomList();
loadApplyToAllMeetingUrls();

document.getElementById('save-options').addEventListener('click', e => {
  Promise.all([
    saveRoomList(),
    saveApplyToAllMeetingUrls(),
  ])
    .then(() => {
      const n = document.createElement('strong');
      n.innerText = 'Saved!';
      (e.target as HTMLButtonElement).parentNode.appendChild(n);
      setTimeout(() => n.remove(), 1000);
    })
    .catch(() => {
      const n = document.createElement('strong');
      n.innerText = 'Error!';
      (e.target as HTMLButtonElement).parentNode.appendChild(n);
      setTimeout(() => n.remove(), 1000);
    });
});
