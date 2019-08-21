import * as options from '../roomList';

describe('options page tests', () => {
  describe('import/export functionality', () => {
    it('should be able to clean a supplied list of meeting rooms', () => {
      const defaultRoomList = `
        zoo
        https://whereby.com/zoo
        https://whereby.com/example
        intensity
        http://example.org/danger.zone
      `;
      expect(options.cleanRoomList(defaultRoomList)).toEqual([
        'example',
        'intensity',
        'zoo',
      ]);
    });
  });
});
