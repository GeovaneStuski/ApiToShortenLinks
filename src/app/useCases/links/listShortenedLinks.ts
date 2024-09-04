import { Response } from 'express';

import { query } from '../../database';
import { AuthRequest } from '../../../@types/AuthRequest';


export async function listShortenedLinks(req: AuthRequest, res: Response) {
  const user = req.user;

  if(!user) return res.status(401).json('User not authenticated');

  try {
    const links = await query('SELECT * FROM shortened_links WHERE user_id = $1', [user.id]);

    res.status(200).json(links);
  } catch {
    res.sendStatus(500);
  }
}