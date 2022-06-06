import express from 'express';

import chainController from '../controllers/chain';
import auth from '../auth';

const router = express.Router();

router.post('/blocks', auth.checkAuthentication, chainController.addBlock);
router.get('/blocks', auth.checkAuthentication, chainController.getUserBlocks);

export default router;
