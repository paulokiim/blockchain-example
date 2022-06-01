import blockchain from '../core/chain';

const addBlock = (params: AddBlockParams) => blockchain.addNewBlock(params);

const getUserBlocks = (params: GetExamsParams) =>
  blockchain.getUserBlocks(params);

const getBlockchain = () => blockchain.getBlockchain();

const getLatestBlock = () => blockchain.getLastestBlock();

const replaceBlockchain = (blockchainArray: BlockchainArray) =>
  blockchain.replaceBlockchain(blockchainArray);

const isChainValid = (blockchainArray: BlockchainArray) =>
  blockchain.chainIsValid(blockchainArray);

export default {
  addBlock,
  getUserBlocks,
  getBlockchain,
  getLatestBlock,
  replaceBlockchain,
  isChainValid,
};
