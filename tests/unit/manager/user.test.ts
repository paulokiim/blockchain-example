import { constants as HttpStatus } from 'http2';

import userManager from '../../../src/manager/user';
import userRepository from '../../../src/core/repository/user';
import exceptions from '../../../src/core/exceptions/user';
import auth from '../../../src/auth';

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
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(() => new Promise((resolve) => resolve(undefined)));
      const addParams: UserSaveParams = {
        username: mockedUser.username,
        password: mockedUser.password,
        email: mockedUser.email,
        phoneNumber: mockedUser.phoneNumber,
      };
      const user = await userManager.register(addParams);
      expect(user.data).toEqual({ created: true });
      expect(user.statusCode).toEqual(HttpStatus.HTTP_STATUS_CREATED);
    });
    it('Should find email already in use', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(
          () => new Promise((resolve) => resolve(mockedUser))
        );
      const addParams: UserSaveParams = {
        username: mockedUser.username,
        password: mockedUser.password,
        email: mockedUser.email,
        phoneNumber: mockedUser.phoneNumber,
      };
      const user = await userManager.register(addParams);
      expect(user.data).toEqual(exceptions.userAlreadyExists.data);
      expect(user.statusCode).toEqual(exceptions.userAlreadyExists.statusCode);
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
      const user = await userManager.login(loginParams);
      const token = auth.createJWTToken({ uid: mockedUser.uid });
      expect(user.data).toEqual({ auth: true, token });
      expect(user.statusCode).toEqual(HttpStatus.HTTP_STATUS_OK);
    });
    it('Should not find a user', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(() => new Promise((resolve) => resolve(undefined)));
      const loginParams: UserLoginParams = {
        username: mockedUser.username,
      };
      const user = await userManager.login(loginParams);
      expect(user.data).toEqual(exceptions.userNotFound.data);
      expect(user.statusCode).toEqual(exceptions.userNotFound.statusCode);
    });
  });
});
