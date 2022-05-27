import { Server } from 'http';
import WebSocket from 'ws';

import { mockedBlock } from '../../fixtures/block';

import MSG_TYPE from '../../../src/enums/node-message';
import nodeService from '../../../src/services/node';
import chainManager from '../../../src/manager/chain';

describe('Testing node.ts from services', () => {
  const mockServer = new Server();
  const ws = new WebSocket('ws://localhost:3000');

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    mockServer.close();
  });

  describe('Testing messageHandler()', () => {
    it('Should substitute blockchain', () => {
      nodeService.messageHandler(
        ws,
        JSON.stringify({ type: MSG_TYPE.NEW_NODE })
      );
    });
  });

  describe('Testing broadcast()', () => {
    it('Should broadcast message to all sockets', () => {
      const mockWsSend = jest.spyOn(ws, 'send').mockImplementation(() => {});
      nodeService.broadcast([ws], { type: 'fake', data: { fake: 'fake' } });
      expect(ws.on).toBeCalled;
      expect(mockWsSend).toBeCalled;
    });
  });

  describe('# Testing writeMessage()', () => {
    it('Should write a message to socket', () => {
      const mockWsSend = jest.spyOn(ws, 'send').mockImplementation(() => {});
      nodeService.writeMessage(ws, {
        type: 'fake',
        data: { fake: 'fake' },
      });
      expect(JSON.stringify).toBeCalled;
      expect(mockWsSend).toBeCalled;
    });
  });
});
