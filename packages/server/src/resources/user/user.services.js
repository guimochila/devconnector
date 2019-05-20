import User from './user.model';

export const getUserInfo = async id => {
  const user = await User.findById(id).select('-password');
  return user;
};

export const removeUser = async id => {
  const user = await User.findById(id);

  if (!user) return null;

  return user.remove();
};
