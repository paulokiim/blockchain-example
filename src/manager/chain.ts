import blockchain from '../core/chain';
import block from '../core/chain/block';
import nodeService from '../services/node';
import { sockets } from '../core/chain/node';

import MSG_TYPES from '../enums/node-message';

const addBlock = (params: AddBlockParams) => {
  const { data, timestamp } = params;
  const latestBlock = getLatestBlock();
  const buildedBlock = block.createBlock({
    data,
    previousHash: latestBlock.hash,
    timestamp,
  });
  if (sockets.length > 0) {
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

const getUserBlocks = (params: GetExamsParams) =>
  blockchain.getUserBlocks(params);

const getBlockchain = () => blockchain.getBlockchain();

const getLatestBlock = () => blockchain.getLatestBlock();

const replaceBlockchain = (blockchainArray: BlockchainArray) =>
  blockchain.replaceBlockchain(blockchainArray);

const isChainValid = (blockchainArray: BlockchainArray) =>
  blockchain.chainIsValid(blockchainArray);

const commitBlock = (block: Block) => blockchain.addNewBlock(block);

export default {
  addBlock,
  commitBlock,
  getUserBlocks,
  getBlockchain,
  getLatestBlock,
  replaceBlockchain,
  isChainValid,
};
