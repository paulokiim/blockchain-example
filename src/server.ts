import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

const addMiddlewares = (app: express.Application) => {
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: false }));
};

const setupApp = () => {
  const app = express();

  addMiddlewares(app);

  return app;
};

export default setupApp;
