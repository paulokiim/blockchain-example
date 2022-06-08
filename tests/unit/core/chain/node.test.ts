import { Server } from 'http';
import WebSocket from 'ws';

import nodeFunctions, * as internalFunctions from '../../../../src/core/chain/node';
import nodeService from '../../../../src/services/node';

describe('Testing node.ts from core/chain', () => {
  const mockServer = new Server();
  const ws = new WebSocket('ws://localhost:3000');

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    mockServer.close();
  });

  describe('Testing initPeerToPeerServer()', () => {
    it('Should start peer to peer server', () => {
      const server = nodeFunctions.initPeerToPeerServer(mockServer);
      expect(server).not.toBeUndefined;
    });
  });

  describe('Testing initConnection()', () => {
    it('Should init connection to socket', () => {
      const mockInitErrorHandler = jest
        .spyOn(internalFunctions, 'initErrorHandler')
        .mockReturnValue();
      const mockInitMessageHandler = jest
        .spyOn(internalFunctions, 'initMessageHandler')
        .mockReturnValue();
      const mockWriteMessage = jest
        .spyOn(nodeService, 'writeMessage')
        .mockReturnValue();
      nodeFunctions.initConnection(ws);
      expect(mockInitErrorHandler).toBeCalled;
      expect(mockInitMessageHandler).toBeCalled;
      expect(mockWriteMessage).toBeCalled;
    });
  });

  describe('Testing initMessageHandler()', () => {
    it('Should init message handler to socket', () => {
      const mockmessageHandler = jest
        .spyOn(nodeService, 'messageHandler')
        .mockReturnValue();
      internalFunctions.initMessageHandler(ws);
      expect(mockmessageHandler).toBeCalled;
    });
  });

  describe('Testing reconnectNode()', () => {
    it('Should start peer to peer server', () => {
      const mockedOn = jest.spyOn(ws, 'on').mockImplementation();
      internalFunctions.reconnectNode('ws://localhost:3000');
      expect(mockedOn).toBeCalled;
    });
  });

  describe('Testing closeConnection()', () => {
    it('Should close socket connection', () => {
      const mockedReconnectNode = jest
        .spyOn(internalFunctions, 'reconnectNode')
        .mockImplementation();
      expect(internalFunctions.sockets.length).toEqual(1);

      internalFunctions.closeConnection(ws);

      expect(internalFunctions.sockets.length).toEqual(0);
      expect(mockedReconnectNode).toBeCalled;
    });
  });

  describe('Testing initErrorHandler()', () => {
    it('Should init error handler on socket', () => {
      const mockWsSend = jest.spyOn(ws, 'send').mockImplementation(() => {});
      internalFunctions.initErrorHandler(ws);

      expect(mockWsSend).toBeCalled;
    });
  });
});
