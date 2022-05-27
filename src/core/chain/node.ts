import { Server } from 'http';
import WebSocket from 'ws';

import config from '../config';
import nodeService from '../../services/node';

import MSG_TYPES from '../../enums/node-message';

export const sockets: SocketsArray = [];

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
  nodeService.writeMessage(ws, {
    type: MSG_TYPES.GET_ALL,
  });
};

export const initMessageHandler = (ws: WebSocket.WebSocket) => {
  ws.on('message', (data: string) => nodeService.messageHandler(ws, data));
};

export const closeConnection = (ws: WebSocket.WebSocket) => {
  sockets.splice(sockets.indexOf(ws), 1);
};

export const initErrorHandler = (ws: WebSocket.WebSocket) => {
  ws.on('close', () => closeConnection(ws));
  ws.on('error', () => closeConnection(ws));
};

export default { initPeerToPeerServer, initConnection };
