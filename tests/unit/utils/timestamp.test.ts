import timestamp from '../../../src/utils/timestamp';

describe('Testing timestamp.ts from utils', () => {
  describe('Testing getTimestamp()', () => {
    Date.now = jest.fn().mockReturnValue(1);
    it('Should create a timestamp', () => {
      const newTimestamp = timestamp.getTimestamp();
      expect(newTimestamp).toEqual(1);
    });
  });
});
