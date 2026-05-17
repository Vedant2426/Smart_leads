import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from '../services';
import { User } from '../models';
import { asyncHandler, sendSuccess, NotFoundError } from '../utils';

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await AuthService.register(req.body);
    sendSuccess(res, result, 'User registered successfully', StatusCodes.CREATED);
  });

  static login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await AuthService.login(req.body);
    sendSuccess(res, result, 'Login successful');
  });

  static getProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.user!.id).select('-password');
    if (!user) {
      throw new NotFoundError('User');
    }
    sendSuccess(res, {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, 'Profile retrieved successfully');
  });
}

