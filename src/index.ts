import 'reflect-metadata';

import config from './core/config';
import server from './server';
import chain from './core/chain';
import node from './core/chain/node';

const startBlockchain = (): BlockchainArray => chain.createBlockchain();

const startServer = async () => {
  const app = server();

  startBlockchain();

  const expressServer = app.listen(config.PORT, () =>
    console.log(`Listening to PORT ${config.PORT}`)
  );

  node.initPeerToPeerServer(expressServer);

  return app;
};

export default startServer();
