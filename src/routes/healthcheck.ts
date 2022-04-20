import express from 'express';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.send({ ok: true }));

export default router;
