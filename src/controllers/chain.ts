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

  const block = chainManager.addBlock(blockData);
  return res.send({ block });
};

export default { addBlock };
