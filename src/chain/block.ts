import * as crypto from 'crypto';

const calculateHash = ({
  timestamp,
  data,
  previousHash,
}: CalculateHashDTO): string => {
  const blockString = `${timestamp}${previousHash}${JSON.stringify(data)}`;
  return crypto.createHash('sha256').update(blockString).digest('hex');
};

const createBlock = ({ data, previousHash }: NewBlockDTO): Block => {
  const timestamp = Date.now();
  return {
    timestamp,
    data,
    previousHash,
    hash: calculateHash({ timestamp, data, previousHash }),
  };
};

export default { createBlock, calculateHash };
