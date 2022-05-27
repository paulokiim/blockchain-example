import WebSocket from 'ws';

import chainManager from '../manager/chain';

import MSG_TYPES from '../enums/node-message';

export const subtituteBlockchain = () => {
  const blockchain = chainManager.getBlockchain();
  const substitutedBlockchain = chainManager.substituteBlockchain(blockchain);
  return substitutedBlockchain;
};

const messageHandler = (ws: WebSocket.WebSocket, data: string) => {
  const message = JSON.parse(data);
  switch (message.type) {
    case MSG_TYPES.NEW_NODE:
      subtituteBlockchain();
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

export default { messageHandler, writeMessage, broadcast };
