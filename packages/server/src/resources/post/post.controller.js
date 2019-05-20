import { confirmOwnership } from '../../utils/auth';
import * as postService from './post.services';

export const createPost = async (req, res, next) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res
      .status(400)
      .json({ data: { error: 'Title and text fields are required' } });
  }

  try {
    const posted = await postService.createPost({
      title,
      text,
      author: req.user.id,
    });
    res.status(201).json({ data: { posted } });
  } catch (e) {
    next(e);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await postService.getPosts();
    res.json({ data: { posts } });
  } catch (e) {
    next(e);
  }
};

export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await postService.getPostBySlug(req.params.slug);

    if (!post) {
      return res.status(404).json({ data: { error: 'Post not found' } });
    }

    res.json({ data: { post } });
  } catch (e) {
    next(e);
  }
};

export const removePost = async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({ data: { error: 'Post not found' } });
    }

    if (!confirmOwnership(post, req.user)) {
      return res.status(401).json({
        data: { error: 'You must be the owner of the post to delete it.' },
      });
    }

    await postService.removePost(post);

    res.status(202).send();
  } catch (e) {
    next(e);
  }
};

export const likePost = async (req, res, next) => {
  let operator;

  try {
    const post = await postService.getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({ data: { error: 'Post not found' } });
    }

    operator = post.likes.includes(req.user.id) ? '$pull' : '$addToSet';

    const likes = await postService.addOrRemoveLikes(
      post.id,
      req.user.id,
      operator,
    );

    res.send(likes);
  } catch (e) {
    next(e);
  }
};
