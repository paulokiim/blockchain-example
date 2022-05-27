interface BlockData {
  accountHash: string;
  filename: string;
  url: string;
}

interface Block {
  data: BlockData;
  hash: string;
  previousHash: string;
  timestamp: number;
}

interface NewBlockDTO {
  data: BlockData;
  previousHash: string;
}

interface CalculateHashDTO {
  timestamp: number;
  data: BlockData;
  previousHash: string;
}

interface BlockchainArray extends Array<Block> {}

interface AddBlockParams {
  data: BlockData;
}

interface GetExamsParams {
  accountHash: string;
}
