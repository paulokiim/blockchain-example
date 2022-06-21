import { NextFunction, request } from 'express';
import { constants } from 'http2';
import jwt from 'jsonwebtoken';

import auth from '../../../src/auth';

import { mockedToken, mockedAuthorization } from '../../fixtures/jwt';

describe('Testing Authentications', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('checkAuthentication()', () => {
    describe('When token doesnt exist', () => {
      test('Should return 401 and token not provided error', () => {
        const mockRequest = request;
        mockRequest.headers = {};

        const mockResponse: any = {};
        mockResponse.status = jest.fn().mockReturnValue(mockResponse);
        mockResponse.send = jest.fn().mockReturnValue(mockResponse);
        mockResponse.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;

        const mockNext: NextFunction = jest.fn();
        const res = auth.checkAuthentication(
          mockRequest,
          mockResponse,
          mockNext
        );

        expect(res?.statusCode).toBe(constants.HTTP_STATUS_UNAUTHORIZED);
      });
    });

    describe('When token was not verified', () => {
      test('Should return 401 and token not provided error', () => {
        jest.spyOn(jwt, 'verify').mockImplementation(() => {
          throw Error();
        });
        const mockRequest = request;
        mockRequest.headers = { authorization: mockedAuthorization };

        const mockResponse: any = {};
        mockResponse.status = jest.fn().mockReturnValue(mockResponse);
        mockResponse.send = jest.fn().mockReturnValue(mockResponse);
        mockResponse.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;

        const mockNext: NextFunction = jest.fn();
        const res = auth.checkAuthentication(
          mockRequest,
          mockResponse,
          mockNext
        );

        expect(res?.statusCode).toBe(constants.HTTP_STATUS_UNAUTHORIZED);
      });
    });

    describe('When token is verified', () => {
      test('Should call next function', () => {
        const verify = jest
          .spyOn(jwt, 'verify')
          .mockImplementation(() => mockedToken);
        const mockRequest = request;
        mockRequest.headers = { authorization: mockedAuthorization };
        mockRequest.body = {};

        const mockResponse: any = {};
        mockResponse.status = jest.fn().mockReturnValue(mockResponse);
        mockResponse.send = jest.fn().mockReturnValue(mockResponse);
        mockResponse.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;

        const mockNext: NextFunction = jest.fn();
        auth.checkAuthentication(mockRequest, mockResponse, mockNext);

        expect(verify).toBeCalled();
        expect(mockNext).toBeCalled();
      });
    });
  });

  describe('createJWTToken()', () => {
    describe('When created successfully', () => {
      test('Should return a valid jwt token', () => {
        const token = auth.createJWTToken(mockedToken);

        expect(typeof token).toBe('string');
      });
    });
  });
});
