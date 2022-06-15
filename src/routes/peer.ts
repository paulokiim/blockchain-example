import express from 'express';

import chainController from '../controllers/chain';

const router = express.Router();

router.post('/add', chainController.addBlock);

export default router;
