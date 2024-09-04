import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../../database';

const secretKey = process.env.SECRET_KEY;

export async function authUser(req: Request, res: Response) {
  try {
    if(!secretKey) return null;

    const { username, password } = req.body;
  
    if(!username) return res.status(400).json('Missing username');

    if(!password) return res.status(400).json('Missing password');

    const [user] = await query('SELECT * FROM users WHERE username = $1', [username]);

    if(user && user.password === password) {
      const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

      res.status(201).json(token);
    } else {
      res.status(401).json('Invalid credentils');
    }
  } catch(error) {
    console.error('Error to create new user: ' + error);
    
    res.status(500);
  }
}