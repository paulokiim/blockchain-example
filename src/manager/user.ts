import { constants as HttpStatus } from 'http2';

import auth from '../auth';
import userRepository from '../core/repository/user';
import responseTransformer from '../utils/response';

import exceptions from '../core/exceptions/user';

const register = async (params: UserSaveParams) => {
  await userRepository.save(params);
  const successParams: OnSuccessParams = {
    data: { created: true },
    statusCode: HttpStatus.HTTP_STATUS_CREATED,
  };
  return responseTransformer.onSuccess(successParams);
};

const login = async (params: UserLoginParams) => {
  const user = await userRepository.findOne(params);
  if (user) {
    const token = auth.createJWTToken({ uid: user.uid });
    const successParams: OnSuccessParams = {
      data: { auth: true, token },
      statusCode: HttpStatus.HTTP_STATUS_OK,
    };
    return responseTransformer.onSuccess(successParams);
  }
  return responseTransformer.onSuccess(exceptions.userNotFound);
};

export default { register, login };
