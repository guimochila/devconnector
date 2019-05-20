import { Router } from 'express';
import { isLoggedIn } from '../../utils/auth';
import {
  addEducation,
  addExperience,
  createProfile,
  getMyProfile,
  getProfileById,
  getProfiles,
  removeEducation,
  removeExperience,
} from './profile.controller';

const router = Router();

// Address: /api/profile
router
  .get('/', getProfiles)
  .get('/user/:id', getProfileById)
  .use(isLoggedIn)
  .get('/me', getMyProfile)
  .post('/', createProfile)
  .post('/experience', addExperience)
  .delete('/experience/:id', removeExperience)
  .post('/education', addEducation)
  .delete('/education/:id', removeEducation);

export default router;
