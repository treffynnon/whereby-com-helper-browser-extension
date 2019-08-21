import * as ai from '../whereby';

describe('whereby.com', () => {
  describe('URL handling', () => {
    it('should be able to detect valid and invalid whereby URLs', () => {
      const tests: Array<[string, boolean]> = [
        ['zoo', false],
        ['https://appear.in/zoo', true],
        ['http://appear.in/zoo', true],
        ['https://appear.in/another/meeting/room', true],
        ['  http://appear.in/another.meeting.room  ', true],
        ['https://whereby.com/zoo', true],
        ['http://whereby.com/zoo', true],
        ['https://whereby.com/another/meeting/room', true],
        ['  http://whereby.com/another.meeting.room  ', true],
        ['http://example.org', false],
      ];
      tests.forEach(x => expect(ai.isWhereByUri(x[0])).toBe(x[1]));
    });
    it('should strip room name from whereby URL', () => {
      const tests: Array<[string, string]> = [
        ['zoo', 'zoo'],
        ['https://appear.in/zoo', 'zoo'],
        ['http://appear.in/zoo', 'zoo'],
        ['http://appear.in/zoo', 'zoo'],
        ['https://appear.in/another/meeting/room', 'another/meeting/room'],
        ['https://appear.in/another.meeting.room', 'another.meeting.room'],
        ['    https://appear.in/another.meeting.room   ', 'another.meeting.room'],
        ['https://whereby.com/zoo', 'zoo'],
        ['http://whereby.com/zoo', 'zoo'],
        ['http://whereby.com/zoo', 'zoo'],
        ['https://whereby.com/another/meeting/room', 'another/meeting/room'],
        ['https://whereby.com/another.meeting.room', 'another.meeting.room'],
        ['    https://whereby.com/another.meeting.room   ', 'another.meeting.room'],
      ];
      tests.forEach(x => expect(ai.whereByUriToRoomName(x[0])).toBe(x[1]));
    });
  });
});
