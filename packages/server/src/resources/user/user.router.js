import { Router } from 'express';
import { isLoggedIn } from '../../utils/auth';
import { me, removeUser } from './user.controller';

const router = Router();

// Address: /api/user
router
  .use(isLoggedIn)
  .get('/me', me)
  .delete('/', removeUser);

export default router;
