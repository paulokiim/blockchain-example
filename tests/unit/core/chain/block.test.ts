import blockFunctions from '../../../../src/core/chain/block';

import {
  mockedBlock,
  mockedTimestamp,
  mockedBlockHash,
} from '../../../fixtures/block';

describe('Testing block.ts functions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  Date.now = jest.fn(() => mockedTimestamp);

  describe('Testing calculateHash()', () => {
    it('Should return a new hash', () => {
      const timestamp = Date.now();
      const hash = blockFunctions.calculateHash({
        timestamp,
        data: mockedBlock.data,
        previousHash: mockedBlock.previousHash,
      });
      expect(hash).toEqual(mockedBlockHash);
    });
  });

  describe('Testing createBlock()', () => {
    jest
      .spyOn(blockFunctions, 'calculateHash')
      .mockReturnValue(mockedBlockHash);

    it('Should return a new Block', () => {
      const timestamp = Date.now();
      const block = blockFunctions.createBlock({
        data: mockedBlock.data,
        previousHash: mockedBlock.previousHash,
        timestamp,
      });
      expect(block.data).toEqual(mockedBlock.data);
      expect(block.hash).toEqual(mockedBlockHash);
      expect(block.previousHash).toEqual(mockedBlock.previousHash);
      expect(block.timestamp).toEqual(mockedTimestamp);
    });
  });
});
