import express from 'express';

import peerController from '../controllers/peer';

const router = express.Router();

router.post('/add', peerController.addPeer);

export default router;
