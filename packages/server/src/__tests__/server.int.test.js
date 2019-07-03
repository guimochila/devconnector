import axios from 'axios';
import http from 'http';
import app from '../server';
import { generateUser } from '../utils/testUtils';

let server;
let api;
let token;
let userId;

const user = generateUser();

beforeAll(done => {
  server = http.createServer(app);
  api = axios.create({
    baseURL: 'http://localhost:3000/api',
  });
  server.listen({ port: process.env.PORT }, done);
});

afterAll(done => {
  server.close(done);
});

describe('[Authentication: - Signup]', () => {
  test('it should NOT signup user without required fields', async () => {
    const error = await api.post('/signup', {}).catch(e => e.response);
    expect(error.status).toBe(400);
  });

  test('it should register user', async () => {
    const res = await api.post('/signup', user);
    expect(res.status).toBe(201);
    expect(res.data.user).toBeTruthy();
  });

  test('it should NOT register user with email in use', async () => {
    const error = await api.post('/signup', user).catch(e => e.response);
    expect(error.status).toBe(400);
    expect(error.data).toEqual({ error: expect.any(Array) });
  });

  test('it should NOT signin with wrong credentials', async () => {
    const data = {
      email: user.email,
      password: '123',
    };

    const error = await api.post('/signin', data).catch(e => e.response);
    expect(error.status).toBe(401);
    expect(error.data).toEqual({ error: ['Invalid email or password'] });
  });

  test('it should signin with correct credentials', async () => {
    const data = {
      email: user.email,
      password: user.password,
    };

    const res = await api.post('/signin', data);
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ status: 'Ok' });
    token = res.headers['set-cookie'];
  });
});

describe('[User: Integration]', () => {
  test('it should NOT receive user details if not logged in', async () => {
    const error = await api.get('/user/me').catch(e => e.response);
    expect(error.status).toBe(403);
  });

  test('it should receive user details if logged in', async () => {
    const {
      data: { data },
    } = await api.get('/user/me', {
      headers: {
        Cookie: token,
      },
    });
    expect(data.user).toMatchObject({
      email: user.email.toLocaleLowerCase(),
      name: user.name,
    });
    userId = data.user._id;
  });
});

describe('[Profile: Integration]', () => {
  test('it should create profile', async () => {
    const profileData = {
      company: 'Google',
      website: 'https://google.com',
      location: 'Berlin',
      status: 'Javascript engineer',
      skills: ['Javascript', 'React', 'NodeJS', 'MongoDB'],
    };

    const { data: res } = await api.post('/profile', profileData, {
      headers: {
        Cookie: token,
      },
    });
    expect(res.data.profile).toMatchObject({
      ...profileData,
      website: expect.any(String),
      user: userId,
    });
  });
});
