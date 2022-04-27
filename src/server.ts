import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import multer from 'multer';

import blockchainRoutes from './routes/blockchain';
import healthcheckRoutes from './routes/healthcheck';

const addMiddlewares = (app: express.Application) => {
  app.use(multer().any());
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: false }));
};

const addRoutes = (app: express.Application) => {
  app.use('/chain', blockchainRoutes);
  app.use('/', healthcheckRoutes);
};

const setupApp = () => {
  const app = express();

  addMiddlewares(app);
  addRoutes(app);

  return app;
};

export default setupApp;
