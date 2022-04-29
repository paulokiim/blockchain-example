import responseTransformer from '../../../src/utils/response';

describe('## Testing utils/response.ts', () => {
  describe('## Testing onSuccess()', () => {
    it('Should return success data format', () => {
      const params: OnSuccessParams = {
        data: {},
        statusCode: 200,
      };
      const response = responseTransformer.onSuccess(params);
      expect(response).toEqual(params);
    });
  });
  describe('## Testing onError()', () => {
    it('Should return success data format', () => {
      const params: OnErrorParams = {
        error: '',
        errorDetail: '',
        statusCode: 500,
      };
      const response = responseTransformer.onError(params);
      expect(response).toEqual(params);
    });
  });
});
