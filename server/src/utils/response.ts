import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse, PaginatedResponse, PaginationMeta } from '../interfaces';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode: number = StatusCodes.OK
): void => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  pagination: PaginationMeta,
  message = 'Success'
): void => {
  const response: PaginatedResponse<T> = {
    success: true,
    message,
    data,
    pagination,
  };
  res.status(StatusCodes.OK).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
): void => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    data: null,
  };
  res.status(statusCode).json(response);
};
