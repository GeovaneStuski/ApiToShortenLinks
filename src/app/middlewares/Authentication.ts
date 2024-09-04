import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

interface UserPayload {
  id: string,
  username: string,
  password: string,
}

interface AuthRequest extends Request {
  user?: UserPayload
}

export function Authentication(req: AuthRequest, res: Response, next: NextFunction) {
  if(!secretKey) return res.sendStatus(500);

  const token = req.headers.authorization?.replace('Bearer', '').split(' ')[1] || '';

  try {
    jwt.verify(token, secretKey, (err, user) => {
      req.user = user as UserPayload;
      
      next();
    });
  } catch {
    res.sendStatus(500);
  }
}