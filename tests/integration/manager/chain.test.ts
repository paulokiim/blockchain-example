import manager from '../../../src/manager/chain';
import blockchainFunctions from '../../../src/core/chain';
import {
  mockAddBlockParams,
  mockGetExamsParams,
  mockedBlock,
  mockedBlockchain,
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
      manager.commitBlock(mockedBlock);
      const response = manager.getUserBlocks(mockGetExamsParams);

      expect(response.length).toEqual(1);
    });
  });

  describe('Testing getLatestBlock()', () => {
    it('Should return the latest block', () => {
      const latestBlock = manager.getLatestBlock();

      expect(latestBlock).toEqual(mockedBlock);
    });
  });

  describe('Testing replaceBlockchain()', () => {
    it('Should replace the blockchain', () => {
      const newBlockchain = manager.replaceBlockchain(mockedBlockchain);

      expect(newBlockchain.length).toEqual(mockedBlockchain.length);
    });
  });

  describe('Testing getBlockchain()', () => {
    it('Should return the blockchain', () => {
      const blockchain = manager.getBlockchain();

      expect(blockchain.length).toEqual(mockedBlockchain.length);
    });
  });

  describe('Testing isChainValid()', () => {
    it('Should return valid chain', () => {
      const isChainValid = manager.isChainValid(mockedBlockchain);

      expect(isChainValid).toBeTruthy;
    });
    it('Should return a invalid chain', () => {
      const invalidBlockchain = [...mockedBlockchain];
      invalidBlockchain[0].hash = 'asd';

      const isChainValid = manager.isChainValid(invalidBlockchain);

      expect(isChainValid).toBeFalsy;
    });
  });

  describe('Testing commitBlock()', () => {
    it('Should commit a block', () => {
      const block = manager.commitBlock(mockedBlock);

      expect(block).toEqual(mockedBlock);
    });
  });
});
