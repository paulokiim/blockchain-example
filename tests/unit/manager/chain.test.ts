import { constants as HttpStatus } from 'http2';

import blockchain from '../../../src/core/chain';
import chainManager from '../../../src/manager/chain';

import { mockedBlock } from '../../fixtures/block';

describe('## Testing chain.js from manager', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('# Testing addBlock()', () => {
    jest.spyOn(blockchain, 'addNewBlock').mockReturnValue(mockedBlock);
    it('Should successfully add a block', () => {
      const addParams: AddBlockParams = {
        data: {},
      };
      const response = chainManager.addBlock(addParams);
      expect(response.data).toEqual(mockedBlock);
      expect(response.statusCode).toEqual(HttpStatus.HTTP_STATUS_CREATED);
    });
  });
});
