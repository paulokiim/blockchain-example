import manager from '../../../src/manager/chain';
import blockchainFunctions from '../../../src/core/chain';
import {
  mockAddBlockParams,
  mockGetExamsParams,
  mockedBlock,
} from '../../fixtures/block';

describe('INTEGRATION: Testing src/manager/chain.ts', () => {
  beforeAll(() => {
    blockchainFunctions.createBlockchain();
  });

  describe('Testing addBlock()', () => {
    it('Should add a new block', () => {
      const response = manager.addBlock(mockAddBlockParams);

      expect(response.processing).toBeTruthy;
    });
  });

  describe('Testing getUserBlocks()', () => {
    it('Should get all user blocks', () => {
      mockedBlock.data.accountHash = 'fake';
      manager.addNewBlock(mockedBlock);
      const response = manager.getUserBlocks(mockGetExamsParams);

      expect(response.length).toEqual(1);
    });
  });
});
