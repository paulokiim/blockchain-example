import { Response, Request } from 'express';

const mockRequest = {
  body: {},
  headers: {},
  params: {},
} as Request;

const mockResponse = {
  send: jest.fn(),
  json: jest.fn(),
  status: jest.fn(),
} as unknown as Response;

export { mockRequest, mockResponse };
