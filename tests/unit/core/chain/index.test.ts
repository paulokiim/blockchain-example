import block from '../../../../src/core/chain/block';
import blockchain from '../../../../src/core/chain';
import CHAIN_STATUS from '../../../../src/enums/chain-status';

import {
  mockedGenesisHash,
  mockedTimestamp,
  mockedGenesisBlock,
  mockedInvalidBlock,
  mockedBlock,
  mockGetExamsParams,
  mockedBlockchain,
} from '../../../fixtures/block';

describe('Testing index.ts functions', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const mockBlockCreateBlock = jest.spyOn(block, 'createBlock');
  const mockBlockCalculateHash = jest.spyOn(block, 'calculateHash');
  const mockGetLatestBlock = jest.spyOn(blockchain, 'getLatestBlock');

  Date.now = jest.fn(() => mockedTimestamp);

  describe('Testing getBlockchain()', () => {
    it('Should return the blockchain', () => {
      const blockchainArray = blockchain.getBlockchain();
      expect(blockchainArray.length).toEqual(0);
    });
  });

  describe('Testing setStatus() and getStatus()', () => {
    it.each([
      [CHAIN_STATUS.READY],
      [CHAIN_STATUS.PRE_COMMIT],
      [CHAIN_STATUS.LOCK],
    ])('Should set status', (status) => {
      blockchain.setStatus(status);
      const newStatus = blockchain.getStatus();
      expect(newStatus).toEqual(status);
    });
  });

  describe('Testing createGenesisBlock()', () => {
    it('Should create genesis block', () => {
      const genesisBlock = blockchain.createGenesisBlock();
      expect(genesisBlock.previousHash).toEqual(
        mockedGenesisBlock.previousHash
      );
      expect(genesisBlock.hash).toEqual(mockedGenesisHash);
      expect(genesisBlock.timestamp).toEqual(mockedGenesisBlock.timestamp);
    });
  });

  describe('Testing createBlockchain()', () => {
    it('Should create a new blockchain', () => {
      const newBlockchain = blockchain.createBlockchain();
      expect(newBlockchain.length).toEqual(1);
      expect(newBlockchain).toBeInstanceOf(Array);
      expect(newBlockchain[0].previousHash).toEqual('0');
      expect(newBlockchain[0].hash).toEqual(mockedGenesisHash);
      expect(newBlockchain[0].timestamp).toEqual(mockedGenesisBlock.timestamp);
    });
  });

  describe('Testing getLastestBlock()', () => {
    it('Should get the last block of the blockchain', () => {
      const lastBlock = blockchain.getLatestBlock();
      expect(lastBlock).toEqual(mockedGenesisBlock);
    });
  });

  describe('Testing addNewBlock()', () => {
    it('Should add a new block to the blockchain', () => {
      mockGetLatestBlock.mockReturnValue(mockedGenesisBlock);
      mockBlockCreateBlock.mockReturnValue(mockedBlock);
      const isBlockAdded = blockchain.addNewBlock(mockedBlock);
      expect(isBlockAdded).toBeTruthy;
    });
  });

  describe('Testing chainIsValid()', () => {
    it('Should get a valid chain returning true', () => {
      const validChain = blockchain.chainIsValid(mockedBlockchain);
      expect(validChain).toEqual(true);
    });
    it('Should get invalid blockchain returning false', () => {
      mockGetLatestBlock.mockReturnValue(mockedGenesisBlock);
      mockBlockCreateBlock.mockReturnValue(mockedBlock);
      blockchain.addNewBlock(mockedInvalidBlock);
      const invalidBlockchain = blockchain.getBlockchain();
      const invalidChain = blockchain.chainIsValid(invalidBlockchain);
      expect(invalidChain).toEqual(false);
    });

    it('Should get invalid blockchain when calculating hash', () => {
      mockGetLatestBlock.mockReturnValue(mockedGenesisBlock);
      mockBlockCreateBlock.mockReturnValue(mockedBlock);
      mockBlockCalculateHash.mockReturnValue('');
      blockchain.addNewBlock(mockedInvalidBlock);
      const invalidBlockchain = blockchain.getBlockchain();
      const invalidChain = blockchain.chainIsValid(invalidBlockchain);
      expect(invalidChain).toEqual(false);
    });
  });

  describe('Testing getUserBlocks()', () => {
    it('Should return an empty array', () => {
      const exams = blockchain.getUserBlocks(mockGetExamsParams);
      expect(exams.length).toEqual(0);
    });
    it('Should return all exams from a user', () => {
      const exams = blockchain.getUserBlocks(mockGetExamsParams);
      expect(exams.length).toEqual(0);
    });
  });

  describe('Testing replaceBlockchain()', () => {
    it('Should return the replace blockchain', () => {
      const newBlockchain = blockchain.replaceBlockchain(mockedBlockchain);
      expect(newBlockchain).toEqual(mockedBlockchain);
    });
  });
});
