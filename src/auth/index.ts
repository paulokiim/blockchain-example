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
  try {
    const verifiedJWT = jwt.verify(token, TOKEN_SECRET);

    req.body.uid = (verifiedJWT as Token).uid;
    next();
  } catch (e) {
    return res
      .status(exceptions.jwtTokenExpired.statusCode)
      .send(exceptions.jwtTokenExpired.data);
  }
};

const createJWTToken = (data: Token): string =>
  jwt.sign(data, TOKEN_SECRET, {
    expiresIn: '1800s',
  });

export default {
  checkAuthentication,
  createJWTToken,
};
