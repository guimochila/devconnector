import { Router } from 'express';

const router = Router();

// Address: /api/user
router.get('/', (req, res) => res.send('HI'));

export default router;
