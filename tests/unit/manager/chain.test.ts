import { constants as HttpStatus } from 'http2';

import blockchain from '../../../src/core/chain';
import chainManager from '../../../src/manager/chain';

import { mockedBlock, mockAddBlockParams } from '../../fixtures/block';

describe('## Testing chain.js from manager', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('# Testing addBlock()', () => {
    jest.spyOn(blockchain, 'addNewBlock').mockReturnValue(mockedBlock);
    it('Should successfully add a block', () => {
      const response = chainManager.addBlock(mockAddBlockParams);
      expect(response.data).toEqual(mockedBlock);
      expect(response.statusCode).toEqual(HttpStatus.HTTP_STATUS_CREATED);
    });
  });
});
