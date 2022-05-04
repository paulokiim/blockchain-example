import { createHash } from '../../utils/hash';

const calculateHash = ({
  timestamp,
  data,
  previousHash,
}: CalculateHashDTO): string => {
  const blockString = `${timestamp}${previousHash}${JSON.stringify(data)}`;
  return createHash(blockString);
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
