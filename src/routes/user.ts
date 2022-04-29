import express from 'express';

import userController from '../controllers/user';

const router = express.Router();

router.post('/register', userController.register);
router.get('/login', userController.login);

export default router;
