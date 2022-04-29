import userController from '../../../src/controllers/user';
import userManager from '../../../src/manager/user';

import { mockOnSuccessResponse } from '../../fixtures/common';
import { mockRequest, mockResponse } from '../../fixtures/express';

describe('## Testing user.js from controllers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('# Testing register()', () => {
    jest
      .spyOn(userManager, 'register')
      .mockImplementation(
        () => new Promise((resolve) => resolve(mockOnSuccessResponse))
      );
    it('Should successfully register a user', async () => {
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.send = jest.fn().mockReturnValue(mockOnSuccessResponse.data);
      const block = await userController.register(mockRequest, mockResponse);
      expect(block).toEqual(mockOnSuccessResponse.data);
    });
  });
});
