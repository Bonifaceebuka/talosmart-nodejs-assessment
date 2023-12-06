import jwt from "jsonwebtoken";
import { jwtConfig as config } from "../config";
import User from "../models/user.model";
import { Response, Request, NextFunction } from 'express';
import { IUserAuthRequest } from '../interfaces/user.interface';

type JwtPayload = {
  id: string
}
const auth = async (request: IUserAuthRequest, response: Response, next: NextFunction): Promise<Response | void> => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response
      .status(401)
      .json({ error: "Authorization header is required!" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, config.secret) as JwtPayload;
    if (!id) {
      return response.status(401).json({ error: "Unauthorized access!" });
    }
    
    const userId = await User.findByPk(id);
    if (!userId) {
      return response.status(401).json({ error: "Unauthorized access!" });
    }
    request.authUser = userId;
    next();
  } catch (error) {
    return response.status(401).json({ error: "Unauthorized access!" });
  }
};

export default auth;
