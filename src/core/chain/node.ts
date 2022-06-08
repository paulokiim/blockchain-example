import { Server } from 'http';
import WebSocket from 'ws';

import config from '../config';
import nodeService from '../../services/node';
import chainManager from '../../manager/chain';

import MSG_TYPES from '../../enums/node-message';

export const sockets: SocketsArray = [];

const initPeerToPeerServer = (server: Server) => {
  const wsServer = new WebSocket.Server({ server });
  console.log(`Web Socket server started at port ${config.PORT}`);
  wsServer.on('connection', (ws) => initConnection(ws));
  return wsServer;
};

const initConnection = (ws: WebSocket.WebSocket) => {
  console.log('Peer connected');
  sockets.push(ws);
  initErrorHandler(ws);
  initMessageHandler(ws);
  nodeService.writeMessage(ws, {
    type: MSG_TYPES.NEW_NODE,
    data: { blockchain: chainManager.getBlockchain() },
  });
};

export const initMessageHandler = (ws: WebSocket.WebSocket) => {
  ws.on('message', (data: string) => nodeService.messageHandler({ ws, data }));
};

export const reconnectNode = (url: string) => {
  const socket = new WebSocket(url);
  socket.on('open', () => initConnection(socket));
};

export const closeConnection = (ws: WebSocket.WebSocket) => {
  sockets.splice(sockets.indexOf(ws), 1);
  const serverUrl = ws.url;
  if (serverUrl) reconnectNode(serverUrl);
  ws.removeAllListeners();
  ws.terminate();
  console.log('Attempting reconnect');
};

export const initErrorHandler = (ws: WebSocket.WebSocket) => {
  ws.on('close', () => closeConnection(ws));
  ws.on('error', () => closeConnection(ws));
};

export default { initPeerToPeerServer, initConnection, closeConnection };
