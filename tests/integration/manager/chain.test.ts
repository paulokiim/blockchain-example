import { constants as HttpStatus } from 'http2';

import manager from '../../../src/manager/chain';
import blockchainFunctions from '../../../src/core/chain';
import { mockAddBlockParams, mockGetExamsParams } from '../../fixtures/block';

describe('## INTEGRATION: Testing src/manager/chain.ts', () => {
  beforeAll(() => {
    blockchainFunctions.createBlockchain();
  });
  describe('# Testing addBlock()', () => {
    it('Should add a new block', () => {
      const response = manager.addBlock(mockAddBlockParams);

      expect(response.data.data.filename).toEqual(
        mockAddBlockParams.data.filename
      );
      expect(response.data.data.url).toEqual(mockAddBlockParams.data.url);
      expect(response.statusCode).toEqual(HttpStatus.HTTP_STATUS_CREATED);
    });
  });
  describe('# Testing getUserBlocks()', () => {
    it('Should get all user blocks', () => {
      const response = manager.getUserBlocks(mockGetExamsParams);

      expect(response.data.length).toEqual(1);
      expect(response.statusCode).toEqual(HttpStatus.HTTP_STATUS_OK);
    });
  });
});
