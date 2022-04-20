import { Request, Response } from 'express';

import chainManager from '../manager/chain';

const addBlock = (req: Request, res: Response) => {
  const body = req.body;
  const block = chainManager.addBlock(body);
  return res.send({ block });
};

export default { addBlock };