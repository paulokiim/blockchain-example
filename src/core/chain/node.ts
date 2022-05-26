import { Server } from 'http';
import WebSocket from 'ws';

import config from '../config';

const sockets: Array<WebSocket.WebSocket> = [];

const MSG_TYPES = {
  NEW_NODE: 'NEW_NODE',
  GET_LATEST: 'GET_LATEST',
  GET_ALL: 'GET_ALL',
};

interface Message {
  type: string;
  data: any;
}

const initPeerToPeerServer = (server: Server) => {
  const wsServer = new WebSocket.Server({ server });
  console.log(`Websocket server initialized on PORT ${config.PORT}`);
  wsServer.on('connection', (ws) => initConnection(ws));
  return wsServer;
};

const initConnection = (ws: WebSocket.WebSocket) => {
  sockets.push(ws);
  console.log('New node connected:', ws.url);
  initErrorHandler(ws);
  initMessageHandler(ws);
  writeMessage(ws, { type: MSG_TYPES.NEW_NODE, data: sockets });
};

const initMessageHandler = (ws: WebSocket.WebSocket) => {
  ws.on('message', (data: string) => {
    const message = JSON.parse(data);
    switch (message.type) {
      case MSG_TYPES.GET_LATEST:
        break;
      case MSG_TYPES.GET_ALL:
        break;
      case MSG_TYPES.NEW_NODE:
        sockets.splice(0, sockets.length);
        sockets.push(...message.data);
        // Get blockchain
        // Set blockcahin
        break;
    }
  });
};

const closeConnection = (ws: WebSocket.WebSocket) => {
  sockets.splice(sockets.indexOf(ws), 1);
};

const initErrorHandler = (ws: WebSocket.WebSocket) => {
  ws.on('close', () => closeConnection(ws));
  ws.on('error', () => closeConnection(ws));
};

const writeMessage = (ws: WebSocket.WebSocket, message: Message) => {
  ws.send(JSON.stringify(message));
};

const broadcast = (message: Message) => {
  sockets.forEach((socket) => writeMessage(socket, message));
};

export default { initPeerToPeerServer };
