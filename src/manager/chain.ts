import blockchain from '../core/chain';
import block from '../core/chain/block';
import nodeService from '../services/node';
import { sockets } from '../core/chain/node';
import timestamp from '../utils/timestamp';

import MSG_TYPES from '../enums/node-message';
import CHAIN_STATUS from '../enums/chain-status';

const addBlock = (params: AddBlockParams) => {
  const { data } = params;
  const buildedBlock = buildBlock(data);
  if (sockets.length > 0) {
    setStatus(CHAIN_STATUS.LOCK);
    nodeService.broadcast({
      type: MSG_TYPES.CHANGE_CHAIN_STATUS,
      data: { status: CHAIN_STATUS.LOCK },
    });
    nodeService.broadcast({
      type: MSG_TYPES.ADD_BLOCK,
      data: { block: buildedBlock },
    });
  } else {
    const isBlockchainValid = isChainValid(getBlockchain());
    if (isBlockchainValid) commitBlock(buildedBlock);
  }
  return {
    processing: true,
  };
};

const buildBlock = (data: BlockData) => {
  const latestBlock = getLatestBlock();
  return block.createBlock({
    data,
    previousHash: latestBlock.hash,
    timestamp: timestamp.getTimestamp(),
  });
};

const getUserBlocks = (params: GetExamsParams) =>
  blockchain.getUserBlocks(params);

const getBlockchain = () => blockchain.getBlockchain();

const getLatestBlock = () => blockchain.getLatestBlock();

const replaceBlockchain = (blockchainArray: BlockchainArray) =>
  blockchain.replaceBlockchain(blockchainArray);

const isChainValid = (blockchainArray: BlockchainArray) =>
  blockchain.chainIsValid(blockchainArray);

const commitBlock = (block: Block) => blockchain.addNewBlock(block);

const setStatus = (status: string) => blockchain.setStatus(status);

const getStatus = () => blockchain.getStatus();

export default {
  addBlock,
  commitBlock,
  getUserBlocks,
  getBlockchain,
  getLatestBlock,
  replaceBlockchain,
  isChainValid,
  setStatus,
  getStatus,
  buildBlock,
};
