import { getRepository, createConnection, Connection } from 'typeorm';

import config from '../../../../src/core/config';
import { UserEntity } from '../../../../src/core/entity/UserEntity';
import userRepository from '../../../../src/core/repository/user';

import {
  mockedUserSaveParams,
  mockedUserFindOneParams,
  mockedUser,
} from '../../../fixtures/user';

describe('## Testing user repository functions', () => {
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

  describe('# Testing save()', () => {
    beforeAll(() => {
      jest
        .spyOn(getRepository(UserEntity), 'save')
        .mockImplementation(
          () => new Promise((resolve) => resolve(mockedUser))
        );
    });
    it('Should save a UserEntity', async () => {
      const user = await userRepository.save(mockedUserSaveParams);
      expect(user.username).toEqual(mockedUserSaveParams.username);
      expect(user.password).toEqual(mockedUserSaveParams.password);
      expect(user.phoneNumber).toEqual(mockedUserSaveParams.phoneNumber);
      expect(user.email).toEqual(mockedUserSaveParams.email);
    });
  });

  describe('# Testing findOne()', () => {
    it('Should return a UserEntity', async () => {
      jest
        .spyOn(getRepository(UserEntity), 'findOne')
        .mockImplementation(
          () => new Promise((resolve) => resolve(mockedUser))
        );
      const user = await userRepository.findOne(mockedUserFindOneParams);
      expect(user).not.toEqual(undefined);
      expect(user?.username).toEqual(mockedUser.username);
      expect(user?.password).toEqual(mockedUser.password);
      expect(user?.phoneNumber).toEqual(mockedUser.phoneNumber);
      expect(user?.email).toEqual(mockedUser.email);
    });

    it('Should not return a UserEntity', async () => {
      jest
        .spyOn(getRepository(UserEntity), 'findOne')
        .mockImplementation(() => new Promise((resolve) => resolve(undefined)));
      const user = await userRepository.findOne(mockedUserFindOneParams);
      expect(user).toEqual(undefined);
    });
  });
});
