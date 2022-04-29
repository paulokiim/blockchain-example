import { constants as HttpStatus } from 'http2';

import userManager from '../../../src/manager/user';
import userRepository from '../../../src/core/repository/user';
import errorEnum from '../../../src/enums/error';

import { mockedUser } from '../../fixtures/user';

describe('## Testing user.js from manager', () => {
  afterAll(() => {
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

  describe('# Testing login()', () => {
    it('Should successfully find a user', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(
          () => new Promise((resolve) => resolve(mockedUser))
        );
      const loginParams: UserLoginParams = {
        username: mockedUser.username,
      };
      const block = await userManager.login(loginParams);
      expect(block.data).toEqual(mockedUser);
      expect(block.statusCode).toEqual(HttpStatus.HTTP_STATUS_OK);
    });
    it('Should successfully find a user', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(() => new Promise((resolve) => resolve(undefined)));
      const loginParams: UserLoginParams = {
        username: mockedUser.username,
      };
      const block = await userManager.login(loginParams);
      expect(block.data.detail).toEqual(errorEnum.user.userNotFound);
      expect(block.statusCode).toEqual(HttpStatus.HTTP_STATUS_NOT_FOUND);
    });
  });
});
