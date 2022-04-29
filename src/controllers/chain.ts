import { Request, Response } from 'express';

import chainManager from '../manager/chain';

const addBlock = (req: Request, res: Response) => {
  const file = req.file as Express.MulterS3.File;

  const blockData = {
    data: {
      filename: file.key,
      url: file.location,
    },
  };

  const response = chainManager.addBlock(blockData);
  return res.status(response.statusCode).send(response.data);
};

export default { addBlock };
