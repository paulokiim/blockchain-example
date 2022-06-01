import chainController from '../../../src/controllers/chain';
import chainManager from '../../../src/manager/chain';

import { mockedBlock } from '../../fixtures/block';
import { mockRequest, mockResponse } from '../../fixtures/express';

describe('## Testing chain.js from controllers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('# Testing addBlock()', () => {
    jest.spyOn(chainManager, 'addBlock').mockReturnValue(mockedBlock);
    it('Should successfully add a block', () => {
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.send = jest.fn().mockReturnValue(mockedBlock);
      mockRequest.body = { uid: '' };
      const block = chainController.addBlock(mockRequest, mockResponse);
      expect(block).toEqual(mockedBlock);
    });
  });
  describe('# Testing getUserBlocks()', () => {
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
