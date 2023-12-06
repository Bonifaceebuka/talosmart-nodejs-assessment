import { Request } from 'express';
export interface InewUser {
    id?: number;
    email: string;
    password: string;
}

export interface Iuser {
    id: number;
    email: string;
    password: string;
    updatedAt?: string;
    createdAt?: string;
}

export interface IUserAuthRequest extends Request {
    authUser: any;
  }