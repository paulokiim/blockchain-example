import 'reflect-metadata';
import { createConnection } from 'typeorm';

import config from './core/config';
import server from './server';
import chain from './core/chain';
import node from './core/chain/node';

const startBlockchain = (): BlockchainArray => chain.createBlockchain();

const startServer = async () => {
  const app = server();

  startBlockchain();

  try {
    await createConnection(config.DATABASE_CONFIG);

    const expressServer = app.listen(config.PORT, () =>
      console.log(`Listening to PORT ${config.PORT}`)
    );

    node.initPeerToPeerServer(expressServer);

    return app;
  } catch (error) {
    console.log(error);
    throw new Error('Could not connect to database');
  }
};

export default startServer();
