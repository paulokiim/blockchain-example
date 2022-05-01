import express from 'express';

import chainController from '../controllers/chain';
import auth from '../auth';

const router = express.Router();

router.post('/block', auth.checkAuthentication, chainController.addBlock);

export default router;
