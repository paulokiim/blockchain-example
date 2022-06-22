import { createHash } from '../../../src/utils/hash';

import { mockedGenesisBlock, mockedGenesisHash } from '../../fixtures/block';

describe('Testing hash.ts from utils', () => {
  describe('Testing createHash()', () => {
    it('Should create a hash', () => {
      const { timestamp, previousHash, data } = mockedGenesisBlock;
      const dataString = `${timestamp}${previousHash}${JSON.stringify(data)}`;
      const hash = createHash(dataString);
      expect(hash).toEqual(mockedGenesisHash);
    });
  });
});
