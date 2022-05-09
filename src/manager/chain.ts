import { constants as HttpStatus } from 'http2';

import blockchain from '../core/chain';
import responseTransformer from '../utils/response';

const addBlock = (params: AddBlockParams) => {
  const { data } = params;
  const block = blockchain.addNewBlock(data);
  const successParams: OnSuccessParams = {
    data: block,
    statusCode: HttpStatus.HTTP_STATUS_CREATED,
  };
  return responseTransformer.onSuccess(successParams);
};

const getUserBlocks = (params: GetExamsParams) => {
  const blocks = blockchain.getUserBlocks(params);
  const successParams: OnSuccessParams = {
    data: blocks,
    statusCode: HttpStatus.HTTP_STATUS_OK,
  };
  return responseTransformer.onSuccess(successParams);
};

export default { addBlock, getUserBlocks };
