import { constants as HttpStatus } from 'http2';

import errorEnum from '../../enums/error';

const jwtTokenNotFound = {
  data: {
    detail: errorEnum.authToken.jwtTokenNotFound,
    auth: false,
  },
  statusCode: HttpStatus.HTTP_STATUS_UNAUTHORIZED,
};

const jwtTokenExpired = {
  data: {
    detail: errorEnum.authToken.tokenExpired,
    auth: false,
  },
  statusCode: HttpStatus.HTTP_STATUS_UNAUTHORIZED,
};

export default { jwtTokenNotFound, jwtTokenExpired };
