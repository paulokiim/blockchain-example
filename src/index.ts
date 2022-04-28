import 'reflect-metadata';
import { createConnection } from 'typeorm';

import config from './core/config';
import server from './server';
import chain from './core/chain';
import { exit } from 'process';

const startBlockchain = () => chain.createBlockchain();

const startServer = async () => {
  const app = server();

  startBlockchain();
  try {
    await createConnection(config.DATABASE_CONFIG);

    app.listen(config.PORT, () =>
      console.log(`Listening to PORT ${config.PORT}`)
    );
  } catch (error) {
    console.log(error);
    throw new Error('Could not connect to database');
  }
};

startServer();
