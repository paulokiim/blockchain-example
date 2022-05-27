import { Server } from 'http';
import WebSocket from 'ws';

import nodeService from '../../../src/services/node';

describe('Testing node.ts from services', () => {
  const mockServer = new Server();
  const ws = new WebSocket('ws://localhost:3000');

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    mockServer.close();
  });

  describe('Testing getBlockchain()', () => {
    it('Should get the blockchain', () => {
      const blockchain = nodeService.getBlockchain();
      expect(blockchain.length).toEqual(0);
    });
  });

  describe('Testing messageHandler()', () => {
    it.each([
      '{"type": "NEW_NODE"}',
      '{"type": "GET_LATEST"}',
      '{"type": "GET_ALL"}',
      '{"type": "FAKE"}',
    ])('Should handle message', (data: string) => {
      nodeService.messageHandler(ws, data);
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
