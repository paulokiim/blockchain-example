import { Server } from 'http';
import WebSocket from 'ws';

import {
  mockedBlock,
  mockedBlockchain,
  mockedGenesisBlock,
  mockedTimestamp,
} from '../../fixtures/block';

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

  describe('Testing isBlockchainsEqual()', () => {
    const peerBlockchain = [mockedGenesisBlock, mockedBlock];
    it('Should have equal blockchains', () => {
      jest.spyOn(chainManager, 'getBlockchain').mockReturnValue(peerBlockchain);
      jest.spyOn(chainManager, 'getLatestBlock').mockReturnValue(mockedBlock);
      const isEqual = internalFunctions.isBlockchainsEqual(peerBlockchain);
      expect(isEqual).toBeTruthy;
    });
    it('Should have blockchains with different length', () => {
      const invalidBlockchain = [peerBlockchain[0]];
      jest.spyOn(chainManager, 'getBlockchain').mockReturnValue(peerBlockchain);
      jest.spyOn(chainManager, 'getLatestBlock').mockReturnValue(mockedBlock);
      const isEqual = internalFunctions.isBlockchainsEqual(invalidBlockchain);
      expect(isEqual).toBeFalsy;
    });
    it('Should have different latest hash ', () => {
      const invalidBlock = {
        ...mockedBlock,
        hash: 'asd',
      };
      jest.spyOn(chainManager, 'getBlockchain').mockReturnValue(peerBlockchain);
      jest.spyOn(chainManager, 'getLatestBlock').mockReturnValue(invalidBlock);
      const isEqual = internalFunctions.isBlockchainsEqual(peerBlockchain);
      expect(isEqual).toBeFalsy;
    });
    it('Should have different latest previous hash ', () => {
      const invalidBlock = {
        ...mockedBlock,
        previousHash: 'fake',
      };
      jest.spyOn(chainManager, 'getBlockchain').mockReturnValue(peerBlockchain);
      jest.spyOn(chainManager, 'getLatestBlock').mockReturnValue(invalidBlock);
      const isEqual = internalFunctions.isBlockchainsEqual(peerBlockchain);
      expect(isEqual).toBeFalsy;
    });
  });

  describe('Testing messageHandler()', () => {
    it(`Should handle ${MSG_TYPE.NEW_NODE} type message`, () => {
      const mockedreplaceBlockchain = jest
        .spyOn(internalFunctions, 'replaceBlockchain')
        .mockReturnValue(mockedBlockchain);
      nodeService.messageHandler({
        ws,
        sockets: [ws],
        data: JSON.stringify({
          message: { type: MSG_TYPE.NEW_NODE },
          signature: MSG_TYPE.NEW_NODE,
        }),
      });
      expect(mockedreplaceBlockchain).toBeCalled;
    });
    it(`Should handle ${MSG_TYPE.GET_BLOCKCHAIN_RESPONSE} type message`, () => {
      const mockedisBlockchainsEqual = jest
        .spyOn(internalFunctions, 'isBlockchainsEqual')
        .mockReturnValue(true);
      const mockWsSend = jest.spyOn(ws, 'send').mockImplementation(() => {});
      nodeService.messageHandler({
        ws,
        sockets: [ws],
        data: JSON.stringify({
          message: {
            type: MSG_TYPE.GET_BLOCKCHAIN_RESPONSE,
            data: { mockedBlockchain },
          },
          signature: MSG_TYPE.GET_BLOCKCHAIN_RESPONSE,
        }),
      });
      expect(mockedisBlockchainsEqual).toBeCalled;
      expect(mockWsSend).toBeCalled;
    });
    it(`Should handle ${MSG_TYPE.ADD_BLOCK} type message`, () => {
      const mockWsSend = jest.spyOn(ws, 'send').mockImplementation(() => {});
      nodeService.messageHandler({
        ws,
        sockets: [ws],
        data: JSON.stringify({
          message: { type: MSG_TYPE.ADD_BLOCK, data: { block: mockedBlock } },
          signature: MSG_TYPE.ADD_BLOCK,
        }),
      });
      expect(mockWsSend).toBeCalled;
    });
    it(`Should handle ${MSG_TYPE.GET_BLOCKCHAIN} type message`, () => {
      const mockWsSend = jest.spyOn(ws, 'send').mockImplementation(() => {});
      nodeService.messageHandler({
        ws,
        sockets: [ws],
        data: JSON.stringify({
          message: {
            type: MSG_TYPE.GET_BLOCKCHAIN,
            data: { block: mockedBlock },
          },
          signature: MSG_TYPE.GET_BLOCKCHAIN,
        }),
      });
      expect(mockWsSend).toBeCalled;
    });
    it(`Should handle ${MSG_TYPE.COMMIT_BLOCK} type message`, () => {
      Date.now = jest.fn(() => mockedTimestamp);
      nodeService.messageHandler({
        ws,
        sockets: [ws],
        data: JSON.stringify({
          message: {
            type: MSG_TYPE.COMMIT_BLOCK,
            data: { block: mockedBlock },
          },
          signature: MSG_TYPE.COMMIT_BLOCK,
        }),
      });
      const newBlockchain = chainManager.getLatestBlock();
      expect(newBlockchain.previousHash).toEqual(mockedBlock.hash);
      expect(newBlockchain.timestamp).toEqual(mockedBlock.timestamp);
    });
    it(`Should handle ${MSG_TYPE.REJECT_BLOCK} type message`, () => {
      const mockConsoleLog = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      nodeService.messageHandler({
        ws,
        sockets: [ws],
        data: JSON.stringify({
          message: {
            type: MSG_TYPE.REJECT_BLOCK,
          },
          signature: MSG_TYPE.REJECT_BLOCK,
        }),
      });
      expect(mockConsoleLog).toBeCalled;
    });
    it.each([[true], [false]])(
      `Should handle ${MSG_TYPE.CHAIN_VALIDATION} type message with isValid equal to %p`,
      (isValid) => {
        const mockWsSend = jest.spyOn(ws, 'send').mockImplementation(() => {});
        nodeService.messageHandler({
          ws,
          sockets: [ws],
          data: JSON.stringify({
            message: {
              type: MSG_TYPE.CHAIN_VALIDATION,
              data: { isValid, block: mockedBlock },
            },
            signature: `${MSG_TYPE.CHAIN_VALIDATION}${isValid}`,
          }),
        });
        expect(mockWsSend).toBeCalled;
      }
    );
    it(`Should find signature and not process`, () => {
      nodeService.messageHandler({
        ws,
        sockets: [ws],
        data: JSON.stringify({
          message: {
            type: MSG_TYPE.REJECT_BLOCK,
          },
          signature: MSG_TYPE.REJECT_BLOCK,
        }),
      });
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