import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../resources/user/user.model';
import {
  confirmOwnership,
  decodeToken,
  generateToken,
  isLoggedIn,
  signin,
  signup,
} from '../auth';
import setup from '../testUtils';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Authentication:', () => {
  test('generates new JWT from user', () => {
    const id = 123;
    const token = generateToken({ id });
    const user = jwt.verify(token, process.env.JWT_SECRET);

    expect(user.id).toBe(id);
  });

  test('it should decode token if cookie contains token', () => {
    const { req, res, next } = setup();
    const id = 123;
    req.cookies = {
      token: generateToken({ id }),
    };

    decodeToken(req, res, next);
    expect(req.user).toBeTruthy();
    expect(req.user.id).toBe(id);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('it should confirm ownership from a document author and user', () => {
    const doc = {
      author: {
        _id: '123123',
        equals(user) {
          return this._id === user;
        },
      },
    };
    const user = { id: '123123' };

    expect(confirmOwnership(doc, user)).toBeTruthy();
  });

  test('it should return false when document author and user are different', () => {
    const doc = {
      author: {
        _id: '123123',
        equals(user) {
          return this._id === user;
        },
      },
    };
    const user = { id: '123' };

    expect(confirmOwnership(doc, user)).toBeFalsy();
  });

  test('it should call next if user is logged in', () => {
    const { req, res, next } = setup();

    req.user = {};

    isLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test('it should return 403 in case of user is not logged in', () => {
    const { req, res } = setup();

    isLoggedIn(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('name is required for register', async () => {
    const { req, res, next } = setup();
    const expected = [
      'Name is required and only alpha numeric characters are allowed.',
    ];

    req.body = {
      email: 'test@testing.com',
      password: '123abc',
    };

    await signup(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      error: expect.arrayContaining(expected),
    });
  });

  test('valid email is required for register', async () => {
    const { req, res, next } = setup();
    const expected = ['A valid email is required.'];

    req.body = {
      name: 'User Testing',
      email: 'test@testing',
      password: '123abc',
    };

    await signup(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      error: expect.arrayContaining(expected),
    });
  });

  test('password is required for register and must have betweent 6 characters minimum', async () => {
    const { req, res, next } = setup();
    const expected = [
      'Password is required and must contain between 6 and 50 characters.',
    ];

    req.body = {
      name: 'User Testing',
      email: 'test@testing.com',
    };

    await signup(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      error: expect.arrayContaining(expected),
    });

    jest.clearAllMocks();

    req.body.password = '1234';
    await signup(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      error: expect.arrayContaining(expected),
    });
  });

  test('it should signup user', async () => {
    const { req, res, next } = setup();

    req.body = {
      name: 'UserTest',
      email: 'test_pass@testing.com',
      password: '123abc',
    };

    const createMock = jest.spyOn(User, 'create');
    createMock.mockImplementation(body => {
      if (body.email === 'test@testing.com') {
        throw new Error('E11000 duplicate key error collection');
      }

      return { ...req.body, id: 123 };
    });

    await signup(req, res, next);

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ status: 'Ok' });
  });

  it('should not signup user with existent email', async () => {
    const { req, res, next } = setup();

    req.body = {
      name: 'UserTest',
      email: 'test@testing.com',
      password: '123abc',
    };

    const createMock = jest.spyOn(User, 'create');
    createMock.mockImplementation(body => {
      if (body.email === 'test@testing.com') {
        throw new Error('E11000 duplicate key error collection');
      }

      return { ...req.body, id: 123 };
    });

    await signup(req, res, next);

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email already in use' });
  });

  test('it should signin user', async () => {
    const { req, res, next } = setup();

    req.body = {
      email: 'test@testing.com',
      password: '123abc',
    };

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const findeOneMock = jest.spyOn(User, 'findOne');
    findeOneMock.mockReturnValue({ id: 123, password: hashedPassword });

    await signin(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ status: 'Ok' });
  });
});
