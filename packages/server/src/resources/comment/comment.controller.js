import { confirmOwnership } from '../../utils/auth';
import * as commentService from './comment.services';

export const addComment = async (req, res, next) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ error: 'Text field is required. ' });
  }

  const newComment = {
    text,
    author: req.user.id,
    post: req.params.id,
  };

  try {
    const comment = await commentService.addComment(newComment);
    res.status(201).json({ data: { comment } });
  } catch (e) {
    next(e);
  }
};

export const removeComment = async (req, res, next) => {
  try {
    const comment = await commentService.getComment(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' });
    }

    if (!confirmOwnership(comment, req.user)) {
      return res
        .status(401)
        .json({ error: 'You must be the owner to remove the comment.' });
    }

    await commentService.removeComment(comment);

    res.status(202).send();
  } catch (e) {
    next(e);
  }
};
