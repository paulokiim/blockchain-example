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
      mockResponse.send = jest.fn().mockReturnValue(mockedBlock);
      const block = chainController.addBlock(mockRequest, mockResponse);
      expect(block).toEqual(mockedBlock);
    });
  });
});
