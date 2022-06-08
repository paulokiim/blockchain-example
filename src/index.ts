import 'reflect-metadata';
import WebSocket from 'ws';

import config from './core/config';
import server from './server';
import chain from './core/chain';
import node, { sockets } from './core/chain/node';

const startBlockchain = (): BlockchainArray => chain.createBlockchain();

const startServer = async () => {
  const app = server();

  startBlockchain();

  const expressServer = app.listen(config.PORT, () =>
    console.log(`Listening to PORT ${config.PORT}`)
  );

  node.initPeerToPeerServer(expressServer);
  const socket = new WebSocket('ws//exam-blockchain-node-1.herokuapp.com');
  socket.on('open', () => node.initConnection(socket));

  return app;
};

export default startServer();
