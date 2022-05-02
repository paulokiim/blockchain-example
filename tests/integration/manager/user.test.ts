import { constants as HttpStatus } from 'http2';
import { createConnection, Connection } from 'typeorm';

import userManager from '../../../src/manager/user';
import exceptions from '../../../src/core/exceptions/user';
import auth from '../../../src/auth';
import config from '../../../src/core/config';

import { mockedUser } from '../../fixtures/user';

describe('## INTEGRATION: Testing src/manager/user.ts manager', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection(config.DATABASE_CONFIG);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    connection.close();
  });
  describe('# Testing register()', () => {
    it('Should register a new user', async () => {
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
    it('Should find email already in user', async () => {
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
      const loginParams: UserLoginParams = {
        username: mockedUser.username,
      };
      const user = await userManager.login(loginParams);
      const token = auth.createJWTToken({ uid: mockedUser.uid });
      expect(user.data).toEqual({ auth: true, token });
      expect(user.statusCode).toEqual(HttpStatus.HTTP_STATUS_OK);
    });
    it('Should not find a user', async () => {
      const loginParams: UserLoginParams = {
        username: '',
      };
      const user = await userManager.login(loginParams);
      expect(user.data).toEqual(exceptions.userNotFound.data);
      expect(user.statusCode).toEqual(exceptions.userNotFound.statusCode);
    });
  });
});
