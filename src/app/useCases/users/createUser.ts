import { Request, Response } from 'express';

import { query } from '../../database';

export async function createUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
  
    if(!username) return res.status(400).json('Missing username');

    if(!password) return res.status(400).json('Missing password');

    const [usernameAlreadyInUse] = await query('SELECT * FROM users WHERE username = $1', [username]);

    if(usernameAlreadyInUse) {
      return res.status(200).json('Username already in use');
    }

    const [user] = await query(`
    INSERT INTO users(username, password)
    VALUES($1, $2)
    RETURNING *
  `, [username, password]);

    res.status(201).json(user);
  } catch(error) {
    console.error('Error to create new user: ' + error);
    
    res.status(500);
  }
}