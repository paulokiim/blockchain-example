import WebSocket from 'ws';

import config from '../core/config';
import chainManager from '../manager/chain';
import { createHash } from '../utils/hash';
import { sockets } from '../core/chain/node';
import timestamp from '../utils/timestamp';
import MSG_TYPES from '../enums/node-message';
import CHAIN_STATUS from '../enums/chain-status';

const receivedSignatures: Array<string> = [];

export const isBlockchainsEqual = (peerBlockchain: BlockchainArray) => {
  const blockchain = chainManager.getBlockchain();
  const latestBlock = chainManager.getLatestBlock();
  const peerLatestBlock = peerBlockchain[peerBlockchain.length - 1];
  if (blockchain.length !== peerBlockchain.length) return false;
  if (latestBlock.hash !== peerLatestBlock.hash) return false;
  if (latestBlock.previousHash !== peerLatestBlock.previousHash) return false;
  return true;
};

const messageHandler = ({ ws, data }: MessageHandlerDTO) => {
  const { message, signature } = JSON.parse(data);
  // TODO: Limpar essas signatures depois de um tempo
  if (receivedSignatures.includes(signature)) return;
  receivedSignatures.push(signature);
  switch (message.type) {
    case MSG_TYPES.NEW_NODE:
      const blockchain: BlockchainArray = message.data.blockchain;
      chainManager.replaceBlockchain(blockchain);
      break;
    case MSG_TYPES.CHANGE_CHAIN_STATUS:
      broadcast({
        type: MSG_TYPES.CHANGE_CHAIN_STATUS,
        data: {
          status: message.data.status,
          timestamp: message.data.timestamp,
        },
      });
      const status = message.data.status;
      chainManager.setStatus(status);
      break;
    case MSG_TYPES.GET_BLOCKCHAIN_RESPONSE:
      const isValid = isBlockchainsEqual(message.data.blockchain);
      writeMessage(ws, {
        type: MSG_TYPES.CHAIN_VALIDATION,
        data: {
          isValid,
          block: message.data.block,
        },
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
        writeMessage(ws, {
          type: MSG_TYPES.MAKE_CONCENSUS,
          data: {
            block: message.data.block,
          },
        });
      } else {
        writeMessage(ws, {
          type: MSG_TYPES.REJECT_BLOCK,
          data: {
            block: message.data.block,
          },
        });
      }
      break;
    case MSG_TYPES.MAKE_CONCENSUS:
      broadcast({
        type: MSG_TYPES.MAKE_CONCENSUS,
        data: {
          block: message.data.block,
        },
      });
      setTimeout(() => {
        broadcast({
          type: MSG_TYPES.SYNC_NODES,
          data: {
            block: message.data.block,
          },
        });
      }, Math.random() * 60000);
      break;
    case MSG_TYPES.SYNC_NODES:
      broadcast({
        type: MSG_TYPES.SYNC_NODES,
        data: {
          block: message.data.block,
        },
      });
      const block: Block = message.data.block;
      chainManager.commitBlock(block);
      chainManager.setStatus(CHAIN_STATUS.READY);
      break;
    case MSG_TYPES.REJECT_BLOCK:
      chainManager.setStatus(CHAIN_STATUS.READY);
      broadcast({
        type: MSG_TYPES.CHANGE_CHAIN_STATUS,
        data: {
          status: CHAIN_STATUS.READY,
          timestamp: timestamp.getTimestamp(),
        },
      });
      console.log('Bloco rejeitado: ', message.data.block);
      console.log('Blockchain: ', chainManager.getBlockchain());
      break;
  }
};

const writeMessage = (ws: WebSocket.WebSocket, message: SocketMessage) => {
  const signatureString = `${config.TOKEN_SECRET}-${JSON.stringify(message)}`;
  const signature = createHash(signatureString);
  const payload = { signature, message };
  ws.send(JSON.stringify(payload));
};

const broadcast = (message: SocketMessage) => {
  for (let i = 0; i < sockets.length; i++) {
    writeMessage(sockets[i], message);
  }
};

export default { messageHandler, writeMessage, broadcast };
