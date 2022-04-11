import blockFunctions from '../../../src/chain/block';

describe('## Testing block.ts functions', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const mockedHash =
    'a6ac279c247389beb8ba20e6db6a1c5ef367caa2f4e0206891cb9c0939de1cbb';
  const mockedTimestamp = 1649698218910;
  Date.now = jest.fn(() => mockedTimestamp);

  describe('# Testing calculateHash()', () => {
    it('Should return a new hash', () => {
      const timestamp = Date.now();
      const hash = blockFunctions.calculateHash({
        timestamp,
        data: {},
        previousHash: '',
      });
      expect(hash).toEqual(mockedHash);
    });
  });

  describe('# Testing createBlock()', () => {
    jest.spyOn(blockFunctions, 'calculateHash').mockReturnValue(mockedHash);

    it('Should return a new Block', () => {
      const block = blockFunctions.createBlock({ data: {}, previousHash: '' });
      expect(block.data).toEqual({});
      expect(block.hash).toEqual(mockedHash);
      expect(block.previousHash).toEqual('');
      expect(block.timestamp).toEqual(mockedTimestamp);
    });
  });
});
