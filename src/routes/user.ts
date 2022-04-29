import express from 'express';

import userController from '../controllers/user';

const router = express.Router();

router.post('/register', userController.register);
router.get('/login', (req, res) => res.send({ auth: true }));

export default router;
