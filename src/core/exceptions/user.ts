import { constants as HttpStatus } from 'http2';

import errorEnum from '../../enums/error';

const userNotFound: OnSuccessParams = {
  data: {
    detail: errorEnum.user.userNotFound,
  },
  statusCode: HttpStatus.HTTP_STATUS_NOT_FOUND,
};

export default { userNotFound };
