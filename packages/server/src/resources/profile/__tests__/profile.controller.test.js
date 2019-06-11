import setup from '../../../utils/testUtils';
import { createProfile, getMyProfile } from '../profile.controller';
import * as profileService from '../profile.services';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ProfileControllers:', () => {
  test('it should get user logged in profile', async () => {
    const { req, res, next } = setup();

    const user = { id: 123, name: 'Test' };

    const findProfileMock = jest
      .spyOn(profileService, 'findProfile')
      .mockImplementation(id => {
        if (id !== 123) return;
        return { id, name: 'Test' };
      });

    req.user = user;

    await getMyProfile(req, res, next);

    expect(findProfileMock).toHaveBeenCalledTimes(1);
    expect(findProfileMock).toHaveBeenCalledWith(user.id);
    expect(res.json).toHaveBeenCalledWith({ data: { profile: user } });
  });

  test('it should not get user profile if id not found.', async () => {
    const { req, res, next } = setup();

    const user = { id: 111 };

    const findProfileMock = jest
      .spyOn(profileService, 'findProfile')
      .mockImplementation(id => {
        if (id !== 123) return;
        return { id, name: 'Test' };
      });

    req.user = user;

    await getMyProfile(req, res, next);

    expect(findProfileMock).toHaveBeenCalledTimes(1);
    expect(findProfileMock).toHaveBeenCalledWith(user.id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
  });

  test('it should NOT create profile if required fields are missing', async () => {
    const { req, res, next } = setup();

    await createProfile(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
  });

  test('it should create profile in case it does not exists', async () => {
    const { req, res, next } = setup();

    req.user = {
      id: 123,
    };

    req.body = {
      company: 'Google',
      website: 'https://google.com',
      location: 'London',
      status: 'Software Engineer',
      skills: ['Javascript', 'React'],
      facebook: 'https://facebook.com/engineer',
    };

    const findProfileMock = jest
      .spyOn(profileService, 'findProfile')
      .mockReturnValue(false);
    const createProfileMock = jest.spyOn(profileService, 'createProfile');

    await createProfile(req, res, next);

    expect(findProfileMock).toHaveBeenCalledTimes(1);
    expect(findProfileMock).toHaveBeenCalledWith(req.user.id);
    expect(createProfileMock).toHaveBeenCalledTimes(1);
    expect(createProfileMock).toHaveBeenCalledWith({
      user: req.user.id,
      company: 'Google',
      website: expect.any(String),
      location: 'London',
      status: 'Software Engineer',
      skills: ['Javascript', 'React'],
      social: { facebook: expect.any(String) },
    });
  });

  test('it should update profile if profile exists', async () => {
    const { req, res, next } = setup();

    req.user = {
      id: 123,
    };

    req.body = {
      company: 'Google',
      website: 'https://google.com',
      location: 'London',
      status: 'Software Engineer',
      skills: ['Javascript', 'React'],
    };

    const findProfileMock = jest
      .spyOn(profileService, 'findProfile')
      .mockReturnValue(true);
    const updateProfileMock = jest.spyOn(profileService, 'updateProfile');

    await createProfile(req, res, next);

    expect(findProfileMock).toHaveBeenCalledTimes(1);
    expect(findProfileMock).toHaveBeenCalledWith(req.user.id);
    expect(updateProfileMock).toHaveBeenCalledTimes(1);
    expect(updateProfileMock).toHaveBeenCalledWith({
      user: req.user.id,
      company: 'Google',
      website: expect.any(String),
      location: 'London',
      status: 'Software Engineer',
      skills: ['Javascript', 'React'],
      social: {},
    });
  });
});
