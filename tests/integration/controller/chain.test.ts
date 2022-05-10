import supertest from 'supertest';
import { constants as HttpStatus } from 'http2';

import auth from '../../../src/auth';
import app from '../../../src';

describe('## INTEGRATION: Testing chain routes', () => {
  jest.setTimeout(10000);
  describe('# Testing POST on /block', () => {
    it('Should create a new block', async () => {
      const token = auth.createJWTToken({ uid: 'fake' });
      const response = await supertest(await app)
        .post('/chain/block')
        .set('Authorization', token)
        .set('Content-Type', 'multipart/form-data')
        .attach('file', '/Users/paulok/Downloads/data.pdf');

      expect(response.status).toEqual(HttpStatus.HTTP_STATUS_CREATED);
    });
    it('# Testing GET on /blocks', async () => {
      const token = auth.createJWTToken({ uid: 'fake' });
      const response = await supertest(await app)
        .get('/chain/blocks')
        .set('Authorization', token);

      expect(response.status).toEqual(HttpStatus.HTTP_STATUS_OK);
    });
  });
});
