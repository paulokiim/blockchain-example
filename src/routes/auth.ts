import express from 'express';
import { constants as HttpStatus } from 'http2';

import auth from '../auth';

const router = express.Router();

router.post('/login', (req, res) => {
  const body = req.body;
  const token = auth.createJWTToken({ uid: body.uid });
  return res.status(HttpStatus.HTTP_STATUS_OK).send({ token, logged: true });
});

export default router;
