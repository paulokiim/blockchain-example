import { getRepository } from 'typeorm';

import { UserEntity } from '../entity/UserEntity';

const save = (params: UserSaveParams): Promise<UserEntity> => {
  const userRepository = getRepository(UserEntity);
  return userRepository.save(params);
};

const findOne = (
  params: UserFindOneParams
): Promise<UserEntity | undefined> => {
  const User = getRepository(UserEntity);
  return User.findOne({ where: params });
};

export default { findOne, save };
