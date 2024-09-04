import { Response } from 'express';

import { query } from '../../database';

import { AuthRequest } from '../../../@types/AuthRequest';

export async function updateShortenedLink(req: AuthRequest, res: Response) {
  const user = req.user;
  
  const { link } = req.body;

  const date = Date.now().toString();

  const { id } = req.params;

  if(!user) return res.status(401).json('User not authenticated');
  
  try {
    const [linkExist] = await query('SELECT * FROM shortened_links WHERE id = $1', [id]);

    if(!linkExist) return res.status(400).json('Link not exist');

    if(linkExist.user_id !== user.id) return res.status(401).json('You can\'t update this link because it doesn\'t belong to you');

    if(linkExist.deleted) return res.status(400).json('This link has been deleted');

    const updatedLink = await query(`
      UPDATE shortened_links
      SET original_url = $1, updated = $2
      WHERE id = $3
      RETURNING *
      `, [link, date, id]);

    res.status(200).json(updatedLink);
  } catch {
    res.sendStatus(500);
  }
}