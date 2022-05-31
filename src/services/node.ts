import WebSocket from 'ws';

import config from '../core/config';
import chainManager from '../manager/chain';
import MSG_TYPES from '../enums/node-message';
import { createHash } from '../utils/hash';

const receivedSignatures: Array<string> = [];

export const replaceBlockchain = () => {
  const blockchain = chainManager.getBlockchain();
  const substitutedBlockchain = chainManager.replaceBlockchain(blockchain);
  return substitutedBlockchain;
};

const messageHandler = (ws: WebSocket.WebSocket, data: string) => {
  const { message, signature } = JSON.parse(data);
  if (receivedSignatures.includes(signature)) return;
  receivedSignatures.push(signature);
  switch (message.type) {
    case MSG_TYPES.NEW_NODE:
      replaceBlockchain();
      break;
  }
};

const writeMessage = (ws: WebSocket.WebSocket, message: SocketMessage) => {
  const signatureString = `${Date.now()}-${config.PORT}-${message}`;
  const signature = createHash(signatureString);
  const payload = { signature, message };
  ws.send(JSON.stringify(payload));
};

const broadcast = (sockets: SocketsArray, message: SocketMessage) => {
  for (let i = 0; i < sockets.length; i++) {
    writeMessage(sockets[i], message);
  }
};

export default { messageHandler, writeMessage, broadcast };
