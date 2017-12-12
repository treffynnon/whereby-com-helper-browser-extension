import * as store from '../utils/store';

const getInput = (): HTMLInputElement =>
  document.getElementById('apply-to-followed-urls') as HTMLInputElement;

export const loadApplyToAllMeetingUrls = () => {
  return store.get(['applyToAllMeetingUrls'])
    .then(({ applyToAllMeetingUrls }) => {
      if (applyToAllMeetingUrls === undefined) {
        return getInput().checked = true;
      }
      getInput().checked = applyToAllMeetingUrls;
    });
};

export const saveApplyToAllMeetingUrls = () => {
  return store.set({ applyToAllMeetingUrls: getInput().checked });
};
