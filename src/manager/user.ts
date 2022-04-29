import { constants as HttpStatus } from 'http2';

import userRepository from '../core/repository/user';
import responseTransformer from '../utils/response';

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
    const successParams: OnSuccessParams = {
      data: user,
      statusCode: HttpStatus.HTTP_STATUS_OK,
    };
    return responseTransformer.onSuccess(successParams);
  }
  const notFoundParams: OnSuccessParams = {
    data: 'User Not Found',
    statusCode: HttpStatus.HTTP_STATUS_NOT_FOUND,
  };
  return responseTransformer.onSuccess(notFoundParams);
};

export default { register, login };
