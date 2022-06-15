import peerController from '../../../src/controllers/peer';
import peerManager from '../../../src/manager/peer';

import { mockRequest, mockResponse } from '../../fixtures/express';

describe('Testing peer.ts from controllers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Testing addPeer()', () => {
    it('Should successfully add a peer', () => {
      const peer = 'ws://localhost';
      jest.spyOn(peerManager, 'addPeer').mockImplementation(() => peer);
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.send = jest.fn().mockReturnValue({ peer });
      mockRequest.body = { peer };
      const response = peerController.addPeer(mockRequest, mockResponse);
      expect(response).toEqual({ peer });
    });
  });
});
