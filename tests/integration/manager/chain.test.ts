import manager from '../../../src/manager/chain';
import blockchainFunctions from '../../../src/core/chain';
import { mockAddBlockParams, mockGetExamsParams } from '../../fixtures/block';

describe('INTEGRATION: Testing src/manager/chain.ts', () => {
  beforeAll(() => {
    blockchainFunctions.createBlockchain();
  });
  describe('Testing addBlock()', () => {
    it('Should add a new block', () => {
      const response = manager.addBlock(mockAddBlockParams);

      expect(response.data.filename).toEqual(mockAddBlockParams.data.filename);
      expect(response.data.url).toEqual(mockAddBlockParams.data.url);
    });
  });
  describe('Testing getUserBlocks()', () => {
    it('Should get all user blocks', () => {
      const response = manager.getUserBlocks(mockGetExamsParams);

      expect(response.length).toEqual(1);
    });
  });
});
