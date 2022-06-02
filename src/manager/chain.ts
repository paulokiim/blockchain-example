import blockchain from '../core/chain';
import block from '../core/chain/block';
import nodeService from '../services/node';

import MSG_TYPES from '../enums/node-message';

const addBlock = (params: AddBlockParams) => {
  const { data, timestamp } = params;
  const latestBlock = getLatestBlock();
  const buildedBlock = block.createBlock({
    data,
    previousHash: latestBlock.hash,
    timestamp,
  });
  nodeService.broadcast({ type: MSG_TYPES.ADD_BLOCK, data: buildedBlock });
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

const addNewBlock = (block: Block) => blockchain.addNewBlock(block);

export default {
  addBlock,
  addNewBlock,
  getUserBlocks,
  getBlockchain,
  getLatestBlock,
  replaceBlockchain,
  isChainValid,
};
