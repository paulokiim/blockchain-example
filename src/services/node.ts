import WebSocket from 'ws';

import chainManager from '../manager/chain';

import MSG_TYPES from '../enums/node-message';

const getBlockchain = () => {
  const blockchain = chainManager.getBlockchain();
  return blockchain;
};

export const messageHandler = (ws: WebSocket.WebSocket, data: string) => {
  const message = JSON.parse(data);
  switch (message.type) {
    case MSG_TYPES.GET_LATEST:
      break;
    case MSG_TYPES.GET_ALL:
      break;
    case MSG_TYPES.NEW_NODE:
      // Get blockchain
      // Set blockcahin
      break;
    default:
      break;
  }
};

const writeMessage = (ws: WebSocket.WebSocket, message: SocketMessage) => {
  ws.send(JSON.stringify(message));
};

const broadcast = (sockets: SocketsArray, message: SocketMessage) => {
  for (let i = 0; i < sockets.length; i++) {
    writeMessage(sockets[i], message);
  }
};

export default { getBlockchain, messageHandler, writeMessage, broadcast };
