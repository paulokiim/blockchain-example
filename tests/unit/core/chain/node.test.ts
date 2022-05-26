import { Server } from 'http';
import WebSocket from 'ws';

import nodeFunctions, * as internalFunctions from '../../../../src/core/chain/node';

describe('## Testing node.ts functions', () => {
  const mockServer = new Server();
  let ws: WebSocket.WebSocket;
  let app: WebSocket.Server;

  beforeAll(async () => {
    app = new WebSocket.Server({ server: mockServer });
    ws = new WebSocket('ws://localhost:3000');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {});

  describe('# Testing initPeerToPeerServer()', () => {
    it('Should start peer to peer server', () => {
      const server = nodeFunctions.initPeerToPeerServer(mockServer);
      expect(server).not.toBeUndefined;
    });
  });
  describe('# Testing initConnection()', () => {
    it('Should init connection to socket', () => {
      const mockInitErrorHandler = jest
        .spyOn(internalFunctions, 'initErrorHandler')
        .mockReturnValue();
      const mockInitMessageHandler = jest
        .spyOn(internalFunctions, 'initMessageHandler')
        .mockReturnValue();
      const mockWriteMessage = jest
        .spyOn(internalFunctions, 'writeMessage')
        .mockReturnValue();
      nodeFunctions.initConnection(ws);
      expect(mockInitErrorHandler).toBeCalled;
      expect(mockInitMessageHandler).toBeCalled;
      expect(mockWriteMessage).toBeCalled;
    });
  });
  describe('# Testing initMessageHandler()', () => {
    it('Should init message handler to socket', () => {
      internalFunctions.initMessageHandler(ws);
      expect(ws.on).toBeCalled;
    });
  });
  describe('# Testing closeConnection()', () => {
    it('Should close socket connection', () => {
      expect(internalFunctions.sockets.length).toEqual(1);

      internalFunctions.closeConnection(ws);

      expect(internalFunctions.sockets.length).toEqual(0);
    });
  });
  describe('# Testing initErrorHandler()', () => {
    it('Should init error handler on socket', () => {
      internalFunctions.initErrorHandler(ws);

      expect(ws.on).toBeCalled;
    });
  });
  describe('# Testing broadcast()', () => {
    it('Should broadcast message to all sockets', () => {
      const mockWriteMessage = jest
        .spyOn(internalFunctions, 'writeMessage')
        .mockReturnValue();
      internalFunctions.broadcast({ type: 'fake', data: { fake: 'fake' } });
      expect(ws.on).toBeCalled;
      expect(mockWriteMessage).toBeCalled;
    });
  });
  describe('# Testing messageHandler()', () => {
    it.each([
      '{"type": "NEW_NODE", "data": []}',
      '{"type": "GET_LATEST"}',
      '{"type": "GET_ALL"}',
      '{"type": "FAKE"}',
    ])('Should handle message', (data: string) => {
      internalFunctions.messageHandler(ws, data);
    });
  });
  // describe('# Testing writeMessage()', () => {
  //   it('Should write a message to socket', () => {
  //     internalFunctions.writeMessage(ws, {
  //       type: 'fake',
  //       data: { fake: 'fake' },
  //     });
  //     expect(ws.on).toBeCalled;
  //     expect(JSON.stringify).toBeCalled;
  //   });
  // });
});
