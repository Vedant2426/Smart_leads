import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';
import { UnauthorizedError, ForbiddenError } from '../utils';
import { IUserPayload } from '../interfaces';
import { UserRole } from '../constants';

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new UnauthorizedError('No token provided');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = AuthService.verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('You do not have permission to perform this action');
    }
    next();
  };
};
