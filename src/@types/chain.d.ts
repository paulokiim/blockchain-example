interface Block {
  data: JSONValue;
  hash: string;
  previousHash: string;
  timestamp: number;
}

interface NewBlockDTO {
  data: JSONValue;
  previousHash: string;
}

interface CalculateHashDTO {
  timestamp: number;
  data: JSONValue;
  previousHash: string;
}

interface BlockchainArray extends Array<Block> {}

interface AddBlockParams {
  data: JSONValue;
}
