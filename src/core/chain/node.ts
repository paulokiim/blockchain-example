import { Server } from 'http';
import WebSocket from 'ws';

import config from '../config';

export const sockets: Array<WebSocket.WebSocket> = [];

const MSG_TYPES = {
  SOCKETS: 'SOCKETS',
  NEW_NODE: 'NEW_NODE',
  GET_LATEST: 'GET_LATEST',
  GET_ALL: 'GET_ALL',
  ERROR: 'ERROR',
};

const initPeerToPeerServer = (server: Server) => {
  const wsServer = new WebSocket.Server({ server });
  console.log(`Web Socket server started at port ${config.PORT}`);
  wsServer.on('connection', (ws) => initConnection(ws));
  return wsServer;
};

const initConnection = (ws: WebSocket.WebSocket) => {
  sockets.push(ws);
  initErrorHandler(ws);
  initMessageHandler(ws);
  writeMessage(ws, {
    type: MSG_TYPES.GET_ALL,
    data: { blocks: [] },
  });
};

export const messageHandler = (ws: WebSocket.WebSocket, data: string) => {
  const message = JSON.parse(data);
  switch (message.type) {
    case MSG_TYPES.GET_LATEST:
      break;
    case MSG_TYPES.GET_ALL:
      break;
    case MSG_TYPES.NEW_NODE:
      sockets.push(message.data);
      // Get blockchain
      // Set blockcahin
      break;
    default:
      break;
  }
};

export const initMessageHandler = (ws: WebSocket.WebSocket) => {
  ws.on('message', (data: string) => messageHandler(ws, data));
};

export const closeConnection = (ws: WebSocket.WebSocket) => {
  sockets.splice(sockets.indexOf(ws), 1);
};

export const initErrorHandler = (ws: WebSocket.WebSocket) => {
  ws.on('close', () => closeConnection(ws));
  ws.on('error', () => closeConnection(ws));
};

export const writeMessage = (
  ws: WebSocket.WebSocket,
  message: SocketMessage
) => {
  ws.send(JSON.stringify(message));
};

export const broadcast = (message: SocketMessage) => {
  sockets.forEach((socket) => writeMessage(socket, message));
};

export default { initPeerToPeerServer, initConnection };
