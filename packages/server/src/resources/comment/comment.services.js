import Comment from './comment.model';

export const addComment = async comment => {
  const newComment = await new Comment(comment).save();
  return newComment;
};

export const getComment = async id => {
  const comment = await Comment.findById(id);
  return comment;
};

export const removeComment = async comment => {
  return comment.deleteOne();
};
