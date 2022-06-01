import WebSocket from 'ws';

import config from '../core/config';
import chainManager from '../manager/chain';
import MSG_TYPES from '../enums/node-message';
import { createHash } from '../utils/hash';

const receivedSignatures: Array<string> = [];

export const replaceBlockchain = () => {
  const blockchain = chainManager.getBlockchain();
  const replacedBlockchain = chainManager.replaceBlockchain(blockchain);
  return replacedBlockchain;
};

export const isBlockchainsEqual = (peerBlockchain: BlockchainArray) => {
  const blockchain = chainManager.getBlockchain();
  const latestBlock = chainManager.getLatestBlock();
  const peerLatestBlock = peerBlockchain[peerBlockchain.length - 1];
  if (blockchain.length !== peerBlockchain.length) return false;
  if (latestBlock.hash !== peerLatestBlock.hash) return false;
  if (latestBlock.previousHash !== peerLatestBlock.previousHash) return false;
  return true;
};

const messageHandler = ({ ws, sockets, data }: MessageHandlerDTO) => {
  const { message, signature } = JSON.parse(data);
  if (receivedSignatures.includes(signature)) return;
  receivedSignatures.push(signature);
  switch (message.type) {
    case MSG_TYPES.NEW_NODE:
      replaceBlockchain();
      break;
    case MSG_TYPES.GET_BLOCKCHAIN_RESPONSE:
      const isValid = isBlockchainsEqual(message.data.blockchain);
      writeMessage(ws, {
        type: MSG_TYPES.CHAIN_VALIDATION,
        data: { isValid, block: message.data.block },
      });
      break;
    case MSG_TYPES.ADD_BLOCK:
      writeMessage(ws, {
        type: MSG_TYPES.GET_BLOCKCHAIN,
        data: { block: message.data.block },
      });
      break;
    case MSG_TYPES.GET_BLOCKCHAIN:
      writeMessage(ws, {
        type: MSG_TYPES.GET_BLOCKCHAIN_RESPONSE,
        data: {
          blockchain: chainManager.getBlockchain(),
          block: message.data.block,
        },
      });
      break;
    case MSG_TYPES.CHAIN_VALIDATION:
      if (message.data.isValid) {
        const block: Block = message.data.block;
        chainManager.addBlock({ data: block.data });
        writeMessage(ws, {
          type: MSG_TYPES.COMMIT_BLOCK,
          data: {
            block: message.data.block,
          },
        });
      } else
        writeMessage(ws, {
          type: MSG_TYPES.REJECT_BLOCK,
          data: { block: message.data.block },
        });
      break;
    case MSG_TYPES.COMMIT_BLOCK:
      const block: Block = message.data.block;
      chainManager.addBlock({ data: block.data });
      break;
    case MSG_TYPES.REJECT_BLOCK:
      console.log('Bloco rejeitado');
      break;
  }
};

const writeMessage = (ws: WebSocket.WebSocket, message: SocketMessage) => {
  const signatureString = `${Date.now()}-${config.PORT}-${message}`;
  const signature = createHash(signatureString);
  receivedSignatures.push(signature);
  const payload = { signature, message };
  ws.send(JSON.stringify(payload));
};

const broadcast = (sockets: SocketsArray, message: SocketMessage) => {
  for (let i = 0; i < sockets.length; i++) {
    writeMessage(sockets[i], message);
  }
};

export default { messageHandler, writeMessage, broadcast };
