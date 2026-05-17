import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Validation failed',
          data: formattedErrors,
        });
        return;
      }
      next(error);
    }
  };
};
