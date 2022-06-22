import { constants as HttpStatus } from 'http2';

import responseTransformer from '../../../src/utils/response';

import { mockedBlock, mockedBlockchain } from '../../fixtures/block';

describe('Testing utils/response.ts', () => {
  describe('Testing addBlock()', () => {
    it('Should return addBlock data format', () => {
      const response = responseTransformer.addBlock({ processing: true });
      expect(response.data).toEqual({ processing: true });
      expect(response.statusCode).toEqual(HttpStatus.HTTP_STATUS_CREATED);
    });
  });

  describe('Testing getUserBlocks()', () => {
    it('Should return getUserBlocks data format', () => {
      const response = responseTransformer.getUserBlocks(mockedBlockchain);
      expect(response.data).toEqual(mockedBlockchain);
      expect(response.statusCode).toEqual(HttpStatus.HTTP_STATUS_OK);
    });
  });

  describe('Testing onError()', () => {
    it('Should return error data format', () => {
      const params = {
        error: '',
        errorDetail: '',
        statusCode: 500,
      };
      const response = responseTransformer.onError(params);
      expect(response).toEqual(params);
    });
  });

  describe('Testing addPeer()', () => {
    it('Should return addPeer data format', () => {
      const data = { url: '' };
      const response = responseTransformer.addPeer(data);
      expect(response.data).toEqual(data);
      expect(response.statusCode).toEqual(HttpStatus.HTTP_STATUS_CREATED);
    });
  });
});
