import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import config from './core/config';

const addMiddlewares = (app: express.Application) => {
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: false }));
};

const startServer = () => {
  const app = express();

  addMiddlewares(app);

  app.listen(config.PORT, () =>
    console.log(`Listening on PORT ${config.PORT}`)
  );
};

startServer();
