import { Server } from 'http';
import WebSocket from 'ws';
import rewire from 'rewire';
import path from 'path';

import nodeFunctions from '../../../../src/core/chain/node';

const exposedFunctions = rewire(
  path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'src',
    'core',
    'chain',
    'node.ts'
  )
);

describe('## Testing node.ts functions', () => {
  const app = new Server();
  describe('# Testing initPeerToPeerServer()', () => {
    it('Should start peer to peer server', () => {
      const server = nodeFunctions.initPeerToPeerServer(app);
      expect(server).not.toBeUndefined;
    });
  });
  describe('# Testing initConnection()', () => {
    it('Should init connection to socket', () => {
      const initConnection = exposedFunctions.__get__('initConnection');
      const initErrorHandlerMock = exposedFunctions.__set__(
        'initErrorHandler',
        jest.fn()
      );
      const initMessageHandlerMock = exposedFunctions.__set__(
        'initMessageHandler',
        jest.fn()
      );
      const writeMessageMock = exposedFunctions.__set__(
        'writeMessage',
        jest.fn()
      );
      const ws = new WebSocket.Server({ server: app });
      initConnection(ws);
      expect(initErrorHandlerMock).toBeCalled;
      expect(initMessageHandlerMock).toBeCalled;
      expect(writeMessageMock).toBeCalled;
    });
  });
  describe('# Testing initMessageHandler()', () => {
    it('Should init message handler to socket', () => {
      const initMessageHandler = exposedFunctions.__get__('initMessageHandler');
      const ws = new WebSocket.Server({ server: app });
      initMessageHandler(ws);
      expect(ws.on).toBeCalled;
    });
  });
  describe('# Testing closeConnection()', () => {
    it('Should close socket connection', () => {
      const closeConnection = exposedFunctions.__get__('closeConnection');
      const ws = new WebSocket.Server({ server: app });
      exposedFunctions.__set__('sockets', [ws]);
      const sockets = exposedFunctions.__get__('sockets');
      expect(sockets.length).toEqual(1);

      closeConnection(ws);

      expect(sockets.length).toEqual(0);
    });
  });
  describe('# Testing initErrorHandler()', () => {
    it('Should init error handler on socket', () => {
      const initErrorHandler = exposedFunctions.__get__('initErrorHandler');
      exposedFunctions.__set__('closeConnection', jest.fn());
      const ws = new WebSocket.Server({ server: app });
      initErrorHandler(ws);

      expect(ws.on).toBeCalled;
    });
  });
  describe('# Testing writeMessage()', () => {
    it('Should init error handler on socket', () => {
      const writeMessage = exposedFunctions.__get__('writeMessage');
      const ws = new WebSocket.Server({ server: app });
      writeMessage(ws, { type: 'fake', data: 'fake' });
      expect(JSON.stringify).toBeCalled;
    });
  });
});
