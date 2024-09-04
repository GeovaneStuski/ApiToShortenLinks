import { Response } from 'express';

import { query } from '../../database';
import { AuthRequest } from '../../../@types/AuthRequest';


export async function deleteShortenedLink(req: AuthRequest, res: Response) {
  const user = req.user;

  const date = Date.now().toString();

  const { id } = req.params;

  if(!user) return res.status(401).json('User not authenticated');

  try {
    const [linkExist] = await query('SELECT * FROM shortened_links WHERE id = $1', [id]);

    if(!linkExist) return res.status(400).json('Link not exist');

    if(linkExist.user_id !== user.id) return res.status(401).json('You can\'t update this link because it doesn\'t belong to you');

    if(linkExist.deleted) return res.status(400).json('This link has been deleted');
    
    const deletedLink = await query(`
      UPDATE shortened_links
      SET deleted = $1
      WHERE id = $2
      `, [date, id]);

    res.status(200).json(deletedLink);
  } catch {
    res.sendStatus(500);
  }
}