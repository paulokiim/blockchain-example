import { Request, Response } from 'express';

import { createHash } from '../utils/hash';
import chainManager from '../manager/chain';

const addBlock = (req: Request, res: Response) => {
  const file = req.file as Express.MulterS3.File;
  const body = req.body;

  const blockData: AddBlockParams = {
    data: {
      accountHash: createHash(body.uid),
      filename: file.key,
      url: file.location,
    },
  };

  const response = chainManager.addBlock(blockData);
  return res.status(response.statusCode).send(response.data);
};

const getUserBlocks = (req: Request, res: Response) => {
  const body = req.body;

  const getExamsParams: GetExamsParams = {
    accountHash: createHash(body.uid),
  };
  const response = chainManager.getUserBlocks(getExamsParams);
  return res.status(response.statusCode).send(response.data);
};

export default { addBlock, getUserBlocks };
