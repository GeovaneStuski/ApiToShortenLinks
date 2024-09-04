import { Router } from 'express';

import { createUser } from './app/useCases/users/createUser';
import { authUser } from './app/useCases/users/authUser';
import { Authentication } from './app/middlewares/Authentication';
import { createShortenedLink } from './app/useCases/links/createShortenedLink';
import { listShortenedLinks } from './app/useCases/links/listShortenedLinks';
import { updateShortenedLink } from './app/useCases/links/updateShortenedLink';
import { deleteShortenedLink } from './app/useCases/links/deleteShortenedLink';
import { accessLink } from './app/useCases/links/accessLink';

export const routes = Router();

routes.post('/users', createUser);
routes.post('/users/auth', authUser);

routes.get('/links' , Authentication, listShortenedLinks);
routes.post('/links', Authentication, createShortenedLink);
routes.put('/links/:id', Authentication, updateShortenedLink);
routes.delete('/links/:id', Authentication, deleteShortenedLink);

routes.get('/:id', accessLink);