import blockFunctions from './block';
import CHAIN_STATUS from '../../enums/chain-status';

const blockchain: BlockchainArray = [];
let STATUS = CHAIN_STATUS.READY;

const setStatus = (status: string) => {
  STATUS = status;
};

const getStatus = () => STATUS;

const getBlockchain = (): BlockchainArray => blockchain;

const replaceBlockchain = (newBlockchain: BlockchainArray) => {
  blockchain.splice(0, blockchain.length);
  blockchain.push(...newBlockchain);
  return newBlockchain;
};

const createGenesisBlock = (): Block => {
  const block = blockFunctions.createBlock({
    data: { accountHash: '', filename: '', url: '' },
    previousHash: '0',
    timestamp: 1,
  });
  return block;
};

const createBlockchain = () => {
  const block = createGenesisBlock();
  blockchain.push(block);
  return blockchain;
};

const getLatestBlock = (): Block => {
  const latestBlock = blockchain[blockchain.length - 1];
  return latestBlock;
};

const addNewBlock = (block: Block): boolean => {
  blockchain.push(block);
  return true;
};

const chainIsValid = (blockchainArray: BlockchainArray): boolean => {
  for (let i = 1; i < blockchainArray.length; i++) {
    const currentBlock = blockchainArray[i];
    const previousBlock = blockchainArray[i - 1];

    if (currentBlock.previousHash !== previousBlock.hash) return false;
    if (
      currentBlock.hash !==
      blockFunctions.calculateHash({
        timestamp: currentBlock.timestamp,
        data: currentBlock.data,
        previousHash: currentBlock.previousHash,
      })
    )
      return false;
  }

  return true;
};

const getUserBlocks = (params: GetExamsParams): Array<Block> => {
  const { accountHash } = params;
  const exams = blockchain.filter(
    (block) => block.data.accountHash === accountHash
  );
  return exams;
};

export default {
  setStatus,
  getStatus,
  createGenesisBlock,
  createBlockchain,
  addNewBlock,
  chainIsValid,
  getLatestBlock,
  getUserBlocks,
  getBlockchain,
  replaceBlockchain,
};
