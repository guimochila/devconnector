import Post from './post.model';

export const createPost = async post => {
  const newPost = await new Post(post).save();
  return newPost;
};

export const getPostBySlug = async slug => {
  const post = await Post.findOne({ slug }).populate(
    'author comments',
    'name avatar',
  );
  return post;
};

export const getPosts = async () => {
  const posts = await Post.find().populate('author', 'name avatar');
  return posts;
};

export const getPostById = async id => {
  const post = await Post.findById(id);
  return post;
};

export const removePost = async post => {
  return post.remove();
};

export const addOrRemoveLikes = async (postId, userId, operator) => {
  const likes = await Post.findByIdAndUpdate(
    postId,
    { [operator]: { likes: userId } },
    { new: true },
  );
  return likes;
};
