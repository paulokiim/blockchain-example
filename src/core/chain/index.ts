import blockFunctions from './block';

const blockchain: BlockchainArray = [];

const getBlockchain = (): BlockchainArray => blockchain;

const createGenesisBlock = (): Block => {
  const block = blockFunctions.createBlock({
    data: { accountHash: '', filename: '', url: '' },
    previousHash: '0',
  });
  return block;
};

const createBlockchain = () => {
  const block = createGenesisBlock();
  blockchain.push(block);
  return blockchain;
};

const getLastestBlock = (): Block => {
  const latestBlock = blockchain[blockchain.length - 1];
  return latestBlock;
};

const addNewBlock = (data: BlockData): Block => {
  const latestBlock = getLastestBlock();
  const newBlock = blockFunctions.createBlock({
    data,
    previousHash: latestBlock.hash,
  });
  blockchain.push(newBlock);
  return newBlock;
};

const chainIsValid = (): boolean => {
  for (let i = 1; i < blockchain.length; i++) {
    const currentBlock = blockchain[i];
    const previousBlock = blockchain[i - 1];

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
  createGenesisBlock,
  createBlockchain,
  addNewBlock,
  chainIsValid,
  getLastestBlock,
  getUserBlocks,
  getBlockchain,
};
