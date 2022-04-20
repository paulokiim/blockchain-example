import express from 'express';

import chainController from '../controllers/chain';

const router = express.Router();

router.post('/block', chainController.addBlock);

export default router;
