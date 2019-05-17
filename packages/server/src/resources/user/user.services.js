import User from './user.model';

export const getUserInfo = async id => {
  const user = await User.findById(id).select('-password');
  return user;
};
