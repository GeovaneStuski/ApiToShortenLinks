import { Response } from 'express';

import { query } from '../../database';

import { AuthRequest } from '../../../@types/AuthRequest';

export async function accessLink(req: AuthRequest, res: Response) {
  const { id } = req.params;
  
  try {
    const [linkExist] = await query('SELECT * FROM shortened_links WHERE id = $1', [id]);

    if(!linkExist) return res.status(400).json('Link not exist');

    if(linkExist.deleted) return res.status(400).json('This link has been deleted');
    
    const [updateAccess] = await query(`
      UPDATE shortened_links
      SET access = $1
      WHERE id = $2
      RETURNING *
      `, [linkExist?.access + 1, id]);

    res.redirect(updateAccess.original_url);
  } catch {
    res.sendStatus(500);
  }
}