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

export default { register };
