import { Router } from 'express';
import { isLoggedIn } from '../../utils/auth';
import { me } from './user.controller';

const router = Router();

// Address: /api/user
router.get('/me', isLoggedIn, me);

export default router;
