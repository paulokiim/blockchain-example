import WebSocket from 'ws';

import node from '../core/chain/node';

const addPeer = (params: AddPeerParams) => {
  const { url } = params;

  const socket = new WebSocket(url);

  socket.on('open', () => node.initConnection(socket));
  socket.on('error', () => node.reconnectNode(url, 0));

  return { url };
};

export default { addPeer };
