import { Document } from 'mongoose';
import { UserRole } from '../constants';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserPayload {
  id: string;
  email: string;
  role: UserRole;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface IAuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
}
