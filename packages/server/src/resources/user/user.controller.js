import * as userService from './user.services';

export const me = async (req, res, next) => {
  try {
    const user = await userService.getUserInfo(req.user.id);
    res.json({ data: { user } });
  } catch (e) {
    next(e);
  }
};

export const removeUser = async (req, res, next) => {
  try {
    await userService.removeUser(req.user.id);
    res.status(202).send();
  } catch (e) {
    next(e);
  }
};
