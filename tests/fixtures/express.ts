import { Response, Request } from 'express';

const mockRequest = {
  body: {},
  headers: {},
  params: {},
  file: { originalname: 'fake', location: 'fake' } as Express.MulterS3.File,
} as unknown as Request;

const mockResponse = {
  send: jest.fn(),
  json: jest.fn(),
  status: jest.fn(),
} as unknown as Response;

export { mockRequest, mockResponse };
