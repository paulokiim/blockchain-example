const mockedGenesisHash =
  '44d34c2e5fec6c70251e5c18208c9803b624d6cc2fcb2b770bad5537c8daa8a7';
const mockedBlockHash =
  '8be45c40ac06a32fa653fab338317f68d8ff402ae57a6ea0ebb461ca2ec13994';

const mockedTimestamp = 1649698218910;

const mockedGenesisBlock: Block = {
  timestamp: mockedTimestamp,
  hash: mockedGenesisHash,
  previousHash: '0',
  data: {},
};

const mockedBlock: Block = {
  timestamp: mockedTimestamp,
  hash: mockedBlockHash,
  previousHash: mockedGenesisHash,
  data: {},
};

const mockAddBlockParams: AddBlockParams = {
  data: {
    filename: 'fake',
    url: 'fake',
  },
};

export {
  mockedGenesisHash,
  mockedBlockHash,
  mockedTimestamp,
  mockedGenesisBlock,
  mockedBlock,
  mockAddBlockParams,
};
