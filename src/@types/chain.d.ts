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
  timestamp: number;
}

interface CalculateHashDTO {
  timestamp: number;
  data: BlockData;
  previousHash: string;
}

interface BlockchainArray extends Array<Block> {}

interface AddBlockParams {
  data: BlockData;
  timestamp: number;
}

interface GetExamsParams {
  accountHash: string;
}
