import peerManager from '../../../src/manager/peer';

describe('Testing peer.ts from controllers', () => {
  describe('Testing addPeer()', () => {
    it('Should add new peer', () => {
      const addPeerParams = {
        url: 'ws://localhost:3000',
      };

      const response = peerManager.addPeer(addPeerParams);

      expect(response).toEqual(addPeerParams);
    });
  });
});
