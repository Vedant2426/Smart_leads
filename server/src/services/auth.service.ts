import jwt from 'jsonwebtoken';
import { User } from '../models';
import { env } from '../config/env';
import { IUserPayload, IAuthResponse, IRegisterRequest, ILoginRequest } from '../interfaces';
import { ConflictError, UnauthorizedError } from '../utils';

export class AuthService {
  static generateToken(payload: IUserPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as string & { __brand: 'StringValue' },
    } as jwt.SignOptions);
  }

  static verifyToken(token: string): IUserPayload {
    return jwt.verify(token, env.JWT_SECRET) as IUserPayload;
  }

  static async register(data: IRegisterRequest): Promise<IAuthResponse> {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const user = await User.create(data);

    const tokenPayload: IUserPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = AuthService.generateToken(tokenPayload);

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  static async login(data: ILoginRequest): Promise<IAuthResponse> {
    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const tokenPayload: IUserPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = AuthService.generateToken(tokenPayload);

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}
