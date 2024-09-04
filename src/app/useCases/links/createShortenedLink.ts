import { Response } from 'express';

import { query } from '../../database';

import { createHash } from '../../../utils/createHash';
import { AuthRequest } from '../../../@types/AuthRequest';

export async function createShortenedLink(req: AuthRequest, res: Response) {
  const user = req.user;
  
  const { link } = req.body;

  const hash = createHash(6);

  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const date = Date.now().toString();

  try {
    const [createdLink] = await query(`
      INSERT INTO shortened_links(id, original_url, updated, user_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `, [hash, link, date, user?.id]);

    res.status(200).json(`${baseUrl}/${createdLink.id}`);
  } catch {
    res.sendStatus(500);
  }
}