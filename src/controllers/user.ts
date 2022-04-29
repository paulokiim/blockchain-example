import { Request, Response } from 'express';

import manager from '../manager/user';

const register = async (req: Request, res: Response) => {
  const body = req.body;
  const params: UserSaveParams = {
    username: body.username,
    password: body.password,
    email: body.email,
    phoneNumber: body.phoneNumber,
  };
  const response = await manager.register(params);

  return res.status(response.statusCode).send(response.data);
};

export default { register };
