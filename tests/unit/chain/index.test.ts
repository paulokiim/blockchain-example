import block from '../../../src/chain/block';
import blockchain from '../../../src/chain';

describe('## Testing index.ts functions', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  const mockBlockCreateBlock = jest.spyOn(block, 'createBlock');
  const mockGetLatestBlock = jest.spyOn(blockchain, 'getLastestBlock');

  const mockedGenesisHash =
    '44d34c2e5fec6c70251e5c18208c9803b624d6cc2fcb2b770bad5537c8daa8a7';
  const mockedBlockHash =
    '8be45c40ac06a32fa653fab338317f68d8ff402ae57a6ea0ebb461ca2ec13994';

  const mockedTimestamp = 1649698218910;
  Date.now = jest.fn(() => mockedTimestamp);

  const mockedGenesisBlock = {
    timestamp: mockedTimestamp,
    hash: mockedGenesisHash,
    previousHash: '0',
    data: {},
  };

  const mockedBlock = {
    timestamp: mockedTimestamp,
    hash: mockedBlockHash,
    previousHash: mockedGenesisHash,
    data: {},
  };

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
