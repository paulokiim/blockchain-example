import { constants as HttpStatus } from 'http2';

const onError = (params: OnErrorParams) => {
  const { error, errorDetail, statusCode } = params;
  return {
    error,
    errorDetail,
    statusCode,
  };
};

const addBlock = (processing: JSONObject) => ({
  data: processing,
  statusCode: HttpStatus.HTTP_STATUS_CREATED,
});

const getUserBlocks = (blocks: BlockchainArray) => ({
  data: blocks,
  statusCode: HttpStatus.HTTP_STATUS_OK,
});

export default { onError, addBlock, getUserBlocks };
