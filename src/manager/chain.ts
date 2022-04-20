import blockchain from '../core/chain';

const addBlock = (params: AddBlockParams) => {
  const { data } = params;
  return blockchain.addNewBlock({ data });
};

export default { addBlock };
