const mockedGenesisHash =
  '8a87e70f2f79437eb6f6b1f29676b578be37c903daa21aaff04f3feba626c28e';
const mockedBlockHash =
  '82707a25217e4f2b703f0e1365b42dffe4a6f0b2e402ef30463b093ba7add707';

const mockedTimestamp = 1649698218910;

const mockedGenesisBlock: Block = {
  timestamp: mockedTimestamp,
  hash: mockedGenesisHash,
  previousHash: '0',
  data: { accountHash: '', filename: '', url: '' },
};

const mockedBlock: Block = {
  timestamp: mockedTimestamp,
  hash: mockedBlockHash,
  previousHash: mockedGenesisHash,
  data: { accountHash: '', filename: '', url: '' },
};

const mockedInvalidBlock: Block = {
  timestamp: mockedTimestamp,
  hash: mockedBlockHash,
  previousHash: '',
  data: { accountHash: '', filename: '', url: '' },
};

const mockAddBlockParams: AddBlockParams = {
  data: {
    accountHash: 'fake',
    filename: 'fake',
    url: 'fake',
  },
};

const mockGetExamsParams: GetExamsParams = {
  accountHash: 'fake',
};

export {
  mockedGenesisHash,
  mockedBlockHash,
  mockedTimestamp,
  mockedGenesisBlock,
  mockedBlock,
  mockAddBlockParams,
  mockGetExamsParams,
  mockedInvalidBlock,
};
