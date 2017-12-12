import * as ai from '../appear.in';

describe('appear.in', () => {
  describe('URL handling', () => {
    it('should be able to detect valid and invalid appear.in URLs', () => {
      const tests: Array<[string, boolean]> = [
        ['zoo', false],
        ['https://appear.in/zoo', true],
        ['http://appear.in/zoo', true],
        ['https://appear.in/another/meeting/room', true],
        ['  http://appear.in/another.meeting.room  ', true],
        ['http://example.org', false],
      ];
      tests.forEach(x => expect(ai.isAppearInUri(x[0])).toBe(x[1]));
    });
    it('should strip room name from appear.in URL', () => {
      const tests: Array<[string, string]> = [
        ['zoo', 'zoo'],
        ['https://appear.in/zoo', 'zoo'],
        ['http://appear.in/zoo', 'zoo'],
        ['http://appear.in/zoo', 'zoo'],
        ['https://appear.in/another/meeting/room', 'another/meeting/room'],
        ['https://appear.in/another.meeting.room', 'another.meeting.room'],
        ['    https://appear.in/another.meeting.room   ', 'another.meeting.room'],
      ];
      tests.forEach(x => expect(ai.appearInUriToRoomName(x[0])).toBe(x[1]));
    });
  });
});
