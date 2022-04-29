import { constants as HttpStatus } from 'http2';

import userManager from '../../../src/manager/user';
import userRepository from '../../../src/core/repository/user';

import { mockedUser } from '../../fixtures/user';

describe('## Testing user.js from manager', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('# Testing register()', () => {
    jest
      .spyOn(userRepository, 'save')
      .mockImplementation(() => new Promise((resolve) => resolve(mockedUser)));
    it('Should successfully register a user', async () => {
      const addParams: UserSaveParams = {
        username: mockedUser.username,
        password: mockedUser.password,
        email: mockedUser.email,
        phoneNumber: mockedUser.phoneNumber,
      };
      const block = await userManager.register(addParams);
      expect(block.data).toEqual({ created: true });
      expect(block.statusCode).toEqual(HttpStatus.HTTP_STATUS_CREATED);
    });
  });
});
