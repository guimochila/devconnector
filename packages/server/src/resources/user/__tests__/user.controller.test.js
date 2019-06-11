import setup from '../../../utils/testUtils';
import { me, removeUser } from '../user.controller';
import * as userService from '../user.services';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('UserControllers:', () => {
  test('it should return user details', async () => {
    const { req, res, next } = setup();

    req.user = {
      id: 123,
      name: 'Testing',
    };

    const getUserInfoMock = jest
      .spyOn(userService, 'getUserInfo')
      .mockReturnValue(req.user);

    await me(req, res, next);

    expect(getUserInfoMock).toHaveBeenCalledTimes(1);
    expect(getUserInfoMock).toHaveBeenCalledWith(req.user.id);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ data: { user: req.user } });
  });

  test('it should remove user', async () => {
    const { req, res, next } = setup();

    req.user = { id: 123 };

    const removeUserMock = jest
      .spyOn(userService, 'removeUser')
      .mockReturnValue();

    await removeUser(req, res, next);

    expect(removeUserMock).toHaveBeenCalledTimes(1);
    expect(removeUserMock).toHaveBeenCalledWith(req.user.id);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.send).toHaveBeenCalledTimes(1);
  });
});
