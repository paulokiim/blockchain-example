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
  wsServer.on('connection', (ws) => {
    initConnection(ws);
    setInterval(() => ws.ping(), 45000);
  });
  return wsServer;
};

const setupSocket = (ws: WebSocket.WebSocket) => {
  sockets.push(ws);
  initErrorHandler(ws);
  initMessageHandler(ws);
};

const initConnection = (ws: WebSocket.WebSocket) => {
  setupSocket(ws);
  nodeService.writeMessage(ws, {
    type: MSG_TYPES.NEW_NODE,
    data: { blockchain: chainManager.getBlockchain() },
  });
};

const reconnectNode = (url: string, retryCount: number) => {
  console.log(`Trying to reconnect to ${url}`);
  const socket = new WebSocket(url);
  socket.on('open', () => setupSocket(socket));
  socket.on('error', () => {
    if (retryCount >= 3) return;
    setTimeout(() => reconnectNode(url, retryCount + 1), 60000);
  });
};

export const initMessageHandler = (ws: WebSocket.WebSocket) => {
  ws.on('message', (data: string) => nodeService.messageHandler({ ws, data }));
};

export const closeConnection = (ws: WebSocket.WebSocket) => {
  sockets.splice(sockets.indexOf(ws), 1);
  const serverUrl = ws.url;
  ws.removeAllListeners();
  ws.terminate();
  if (serverUrl) reconnectNode(serverUrl, 0);
};

export const initErrorHandler = (ws: WebSocket.WebSocket) => {
  ws.on('close', () => closeConnection(ws));
  ws.on('error', () => closeConnection(ws));
};

export default {
  initPeerToPeerServer,
  initConnection,
  reconnectNode,
  setupSocket,
};
