import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import exceptions from '../core/exceptions/auth';
import config from '../core/config';

const { TOKEN_SECRET } = config;

const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token)
    return res
      .status(exceptions.jwtTokenNotFound.statusCode)
      .send(exceptions.jwtTokenNotFound.data);
  const verifiedJWT = jwt.verify(token, TOKEN_SECRET);

  if (!verifiedJWT) {
    return res
      .status(exceptions.jwtTokenNotVerified.statusCode)
      .send(exceptions.jwtTokenNotVerified.data);
  }

  req.body.uid = (verifiedJWT as Token).uid;
  next();
};

const createJWTToken = (data: Token): string =>
  jwt.sign(data, TOKEN_SECRET, {
    expiresIn: '1800s',
  });

export default {
  checkAuthentication,
  createJWTToken,
};
