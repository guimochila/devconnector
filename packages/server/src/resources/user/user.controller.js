import * as userService from './user.services';

export const me = async (req, res, next) => {
  try {
    const user = await userService.getUserInfo(req.user.id);
    res.json({ data: { user } });
  } catch (e) {
    next(e);
  }
};
