const mockedGenesisHash =
  '411965bcd4386d243a8008282dfba5c2e3bbead163bf0cb2311056a2a45e308c';
const mockedBlockHash =
  '856b9d38c945494f2f1fe857d20a1c35aa7f913ac0922ac99d08e25f332cc06c';

const mockedTimestamp = 1649698218910;

const mockedGenesisBlock: Block = {
  timestamp: 1,
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
  timestamp: mockedTimestamp,
};

const mockGetExamsParams: GetExamsParams = {
  accountHash: 'fake',
};

const mockedBlockchain = [mockedGenesisBlock, mockedBlock];

export {
  mockedGenesisHash,
  mockedBlockHash,
  mockedTimestamp,
  mockedGenesisBlock,
  mockedBlock,
  mockAddBlockParams,
  mockGetExamsParams,
  mockedInvalidBlock,
  mockedBlockchain,
};
