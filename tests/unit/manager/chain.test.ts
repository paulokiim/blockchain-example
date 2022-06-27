import blockchain from '../../../src/core/chain';
import chainManager from '../../../src/manager/chain';
import nodeService from '../../../src/services/node';
import { sockets } from '../../../src/core/chain/node';
import CHAIN_STATUS from '../../../src/enums/chain-status';

import {
  mockedBlock,
  mockAddBlockParams,
  mockGetExamsParams,
  mockedBlockchain,
  mockedGenesisBlock,
} from '../../fixtures/block';

describe('Testing chain.js from manager', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Testing addBlock()', () => {
    it('Should successfully add a block without peers', () => {
      jest.spyOn(blockchain, 'getLatestBlock').mockReturnValue(mockedBlock);
      jest.spyOn(nodeService, 'broadcast').mockImplementation(() => {});
      jest.spyOn(blockchain, 'addNewBlock').mockReturnValue(true);
      jest.spyOn(blockchain, 'chainIsValid').mockReturnValue(true);
      const response = chainManager.addBlock(mockAddBlockParams);
      expect(response).toEqual({ processing: true });
    });

    it('Should successfully add a block with peers', () => {
      const mockedBroadcast = jest
        .spyOn(nodeService, 'broadcast')
        .mockImplementation(() => {});
      jest.spyOn(blockchain, 'getLatestBlock').mockReturnValue(mockedBlock);
      jest.spyOn(blockchain, 'addNewBlock').mockReturnValue(true);
      sockets.push(1);
      const response = chainManager.addBlock(mockAddBlockParams);
      expect(response).toEqual({ processing: true });
      expect(mockedBroadcast).toHaveBeenCalled;
      sockets.pop();
    });
  });

  describe('Testing getUserBlocks()', () => {
    it('Should successfully get user blocks', () => {
      jest.spyOn(blockchain, 'getUserBlocks').mockReturnValue([mockedBlock]);
      const response = chainManager.getUserBlocks(mockGetExamsParams);
      expect(response).toEqual([mockedBlock]);
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
      jest.spyOn(blockchain, 'getLatestBlock').mockReturnValue(mockedBlock);
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

  describe('Testing isChainValid()', () => {
    it.each([[true], [false]])('Should return a valid blockchain', (result) => {
      jest.spyOn(blockchain, 'chainIsValid').mockReturnValue(result);
      const isValid = chainManager.isChainValid(mockedBlockchain);
      expect(isValid).toEqual(result);
    });
  });

  describe('Testing addNewBlock()', () => {
    it('Should successfully add a new block', () => {
      const isBlockAdded = chainManager.commitBlock(mockedBlock);
      expect(isBlockAdded).toBeTruthy;
    });
  });

  describe('Testing setStatus() and getStatus()', () => {
    it.each([CHAIN_STATUS.READY, CHAIN_STATUS.PRE_COMMIT, CHAIN_STATUS.LOCK])(
      'Should set status',
      (status) => {
        chainManager.setStatus(status);
        const newStatus = chainManager.getStatus();
        expect(newStatus).toEqual(status);
      }
    );
  });

  describe('Testing buildBlock', () => {
    it('Should build block', () => {
      jest
        .spyOn(blockchain, 'getLatestBlock')
        .mockReturnValue(mockedGenesisBlock);
      const block = chainManager.buildBlock(mockedBlock.data);
      expect(block.data).toEqual(mockedBlock.data);
    });
  });
});
