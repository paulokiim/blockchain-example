import { constants as HttpStatus } from 'http2';

import blockchain from '../../../src/core/chain';
import chainManager from '../../../src/manager/chain';

import {
  mockedBlock,
  mockAddBlockParams,
  mockGetExamsParams,
  mockedBlockchain,
} from '../../fixtures/block';

describe('Testing chain.js from manager', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Testing addBlock()', () => {
    it('Should successfully add a block', () => {
      jest.spyOn(blockchain, 'addNewBlock').mockReturnValue(mockedBlock);
      const response = chainManager.addBlock(mockAddBlockParams);
      expect(response.data).toEqual(mockedBlock);
      expect(response.statusCode).toEqual(HttpStatus.HTTP_STATUS_CREATED);
    });
  });

  describe('Testing getUserBlocks()', () => {
    it('Should successfully get user blocks', () => {
      jest.spyOn(blockchain, 'getUserBlocks').mockReturnValue([mockedBlock]);
      const response = chainManager.getUserBlocks(mockGetExamsParams);
      expect(response.data).toEqual([mockedBlock]);
      expect(response.statusCode).toEqual(HttpStatus.HTTP_STATUS_OK);
    });
  });

  describe('Testing getBlockchain()', () => {
    it('Should successfully get the blockchain', () => {
      const blockchainArray = chainManager.getBlockchain();
      expect(blockchainArray.length).toEqual(0);
    });
  });

  describe('Testing getLatestBlock()', () => {
    it('Should successfully get the blockchain', () => {
      jest.spyOn(blockchain, 'getLastestBlock').mockReturnValue(mockedBlock);
      const block = chainManager.getLatestBlock();
      expect(block).toEqual(mockedBlock);
    });
  });

  describe('Testing replaceBlockchain()', () => {
    it('Should return the replace blockchain', () => {
      jest
        .spyOn(blockchain, 'replaceBlockchain')
        .mockReturnValue(mockedBlockchain);
      const newBlockchain = chainManager.replaceBlockchain(mockedBlockchain);
      expect(newBlockchain).toEqual(mockedBlockchain);
    });
  });
});
