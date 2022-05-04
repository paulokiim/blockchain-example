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

export default { addBlock };
