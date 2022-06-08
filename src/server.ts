import express from 'express';
import cors from 'cors';
import multer from 'multer';

import S3Config from './core/config/s3';
import blockchainRoutes from './routes/blockchain';
import healthcheckRoutes from './routes/healthcheck';
import auth from './auth';

const addMiddlewares = (app: express.Application) => {
  app.use(multer(S3Config).single('file'));
  app.use(cors());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: false }));
};

const addRoutes = (app: express.Application) => {
  app.use('/chain', blockchainRoutes);
  app.post('/login', (req, res) => {
    const body = req.body;
    const token = auth.createJWTToken({ uid: body.uid });
    return res.send({ token, logged: true });
  });
  app.use('/', healthcheckRoutes);
};

const setupApp = (): express.Application => {
  const app = express();

  addMiddlewares(app);
  addRoutes(app);

  return app;
};

export default setupApp;
