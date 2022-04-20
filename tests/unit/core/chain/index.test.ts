import block from '../../../../src/core/chain/block';
import blockchain from '../../../../src/core/chain';

import {
  mockedGenesisHash,
  mockedTimestamp,
  mockedGenesisBlock,
  mockedBlock,
} from '../../../fixtures/block';

describe('## Testing index.ts functions', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  const mockBlockCreateBlock = jest.spyOn(block, 'createBlock');
  const mockGetLatestBlock = jest.spyOn(blockchain, 'getLastestBlock');

  Date.now = jest.fn(() => mockedTimestamp);

  describe('# Testing createGenesisBlock()', () => {
    it('Should create genesis block', () => {
      const genesisBlock = blockchain.createGenesisBlock();
      expect(genesisBlock.previousHash).toEqual(
        mockedGenesisBlock.previousHash
      );
      expect(genesisBlock.hash).toEqual(mockedGenesisHash);
      expect(genesisBlock.timestamp).toEqual(mockedTimestamp);
    });
  });

  describe('# Testing createBlockchain()', () => {
    it('Shoulwd creatte a new blockchain', () => {
      const newBlockchain = blockchain.createBlockchain();
      expect(newBlockchain.length).toEqual(1);
      expect(newBlockchain).toBeInstanceOf(Array);
      expect(newBlockchain[0].previousHash).toEqual('0');
      expect(newBlockchain[0].hash).toEqual(mockedGenesisHash);
      expect(newBlockchain[0].timestamp).toEqual(mockedTimestamp);
    });
  });

  describe('# Testing getLastestBlock()', () => {
    it('Should get the last block of the blockchain', () => {
      const lastBlock = blockchain.getLastestBlock();
      expect(lastBlock).toEqual(mockedGenesisBlock);
    });
  });

  describe('# Testing addNewBlock()', () => {
    it('Should add a new block to the blockcahin', () => {
      mockGetLatestBlock.mockReturnValue(mockedGenesisBlock);
      mockBlockCreateBlock.mockReturnValue(mockedBlock);
      const newBlock = blockchain.addNewBlock({
        data: mockedGenesisBlock.data,
      });
      expect(newBlock).toEqual(mockedBlock);
    });
  });

  describe('# Testing chainIsValid()', () => {
    it('Should get a valid chain returning true', () => {
      const validChain = blockchain.chainIsValid();
      expect(validChain).toEqual(true);
    });
    it('Should get invalid blockchain returning false', () => {
      mockGetLatestBlock.mockReturnValue(mockedGenesisBlock);
      mockBlockCreateBlock.mockReturnValue(mockedBlock);
      blockchain.addNewBlock({ data: 1 });
      const invalidChain = blockchain.chainIsValid();
      expect(invalidChain).toEqual(false);
    });
  });
});
