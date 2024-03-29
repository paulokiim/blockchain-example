import { Request, Response } from 'express';

import { createHash } from '../utils/hash';
import chainManager from '../manager/chain';
import timestamp from '../utils/timestamp';
import responseTransformer from '../utils/response';

const addBlock = (req: Request, res: Response) => {
  const file = req.file as Express.MulterS3.File;
  const body = req.body;
  // Usar o uid dentro do body

  const blockData: AddBlockParams = {
    data: {
      accountHash: createHash(body.uid),
      filename: file.key,
      url: file.location,
    },
    timestamp: timestamp.getTimestamp(),
  };

  const block = chainManager.addBlock(blockData);
  const response = responseTransformer.addBlock(block);
  return res.status(response.statusCode).send(response.data);
};

const getUserBlocks = (req: Request, res: Response) => {
  const body = req.body;

  const getExamsParams: GetExamsParams = {
    accountHash: createHash(body.uid),
  };
  const blocks = chainManager.getUserBlocks(getExamsParams);
  const response = responseTransformer.getUserBlocks(blocks);
  return res.status(response.statusCode).send(response.data);
};

export default { addBlock, getUserBlocks };
