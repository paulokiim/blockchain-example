import chainController from '../../../src/controllers/chain';
import chainManager from '../../../src/manager/chain';
import blockchain from '../../../src/core/chain';
import nodeService from '../../../src/services/node';

import { mockedBlock } from '../../fixtures/block';
import { mockRequest, mockResponse } from '../../fixtures/express';

describe('Testing chain.js from controllers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Testing addBlock()', () => {
    it('Should successfully add a block', () => {
      jest.spyOn(blockchain, 'getLatestBlock').mockReturnValue(mockedBlock);
      jest.spyOn(nodeService, 'broadcast').mockImplementation(() => {});
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.send = jest.fn().mockReturnValue({ processing: true });
      mockRequest.body = { uid: '' };
      const response = chainController.addBlock(mockRequest, mockResponse);
      expect(response).toEqual({ processing: true });
    });
  });

  describe('Testing getUserBlocks()', () => {
    it('Should successfully get user blocks', () => {
      jest.spyOn(chainManager, 'getUserBlocks').mockReturnValue([mockedBlock]);
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.send = jest.fn().mockReturnValue([mockedBlock]);
      mockRequest.params = { userUid: 'fake' };
      const block = chainController.getUserBlocks(mockRequest, mockResponse);
      expect(block).toEqual([mockedBlock]);
    });
  });
});
