import { Request, Response } from 'express';

import peerManager from '../manager/peer';
import responseTransformer from '../utils/response';

const addPeer = (req: Request, res: Response) => {
  const body = req.body;

  const peer = peerManager.addPeer(body);

  const response = responseTransformer.addPeer(peer);

  return res.status(response.statusCode).send(response.data);
};

export default { addPeer };
