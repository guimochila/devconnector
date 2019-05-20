import { Router } from 'express';
import { isLoggedIn } from '../../utils/auth';
import { addComment, removeComment } from '../comment/comment.controller';
import {
  createPost,
  getPostBySlug,
  getPosts,
  likePost,
  removePost,
} from './post.controller';

const router = Router();

router
  .use(isLoggedIn)
  .post('/', createPost)
  .get('/', getPosts)
  .get('/:slug', getPostBySlug)
  .delete('/:id', removePost)
  .post('/like/:id', likePost)
  .post('/:id/comment', addComment)
  .delete('/:id/comment/:id', removeComment);

export default router;
