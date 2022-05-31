import { Server } from 'http';
import WebSocket from 'ws';

import { mockedBlockchain } from '../../fixtures/block';

import MSG_TYPE from '../../../src/enums/node-message';
import nodeService, * as internalFunctions from '../../../src/services/node';
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

  describe('Testing replaceBlockchain()', () => {
    it('Should replace blockchain', () => {
      const mockGetBlockchain = jest
        .spyOn(chainManager, 'getBlockchain')
        .mockReturnValue(mockedBlockchain);
      internalFunctions.replaceBlockchain();
      expect(mockGetBlockchain).toBeCalled;
    });
  });

  describe('Testing messageHandler()', () => {
    it(`Should handle ${MSG_TYPE.NEW_NODE} type message`, () => {
      const mockedSubstituteBlockchain = jest
        .spyOn(internalFunctions, 'replaceBlockchain')
        .mockReturnValue(mockedBlockchain);
      nodeService.messageHandler(
        ws,
        JSON.stringify({
          message: { type: MSG_TYPE.NEW_NODE },
          signature: 'fake',
        })
      );
      expect(mockedSubstituteBlockchain).toBeCalled;
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
