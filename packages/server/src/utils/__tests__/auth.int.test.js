import axios from 'axios';
import http from 'http';
import app from '../../server';

let server;
let api;

function setTokenEnv(token) {
  if (token) process.env.TOKEN = token;
}

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
    const data = {
      name: 'Testing User',
      email: 'test@testing.com',
      password: '123abc',
    };

    const res = await api.post('/signup', data);
    expect(res.status).toBe(201);
    expect(res.data).toEqual({ token: expect.any(String) });
  });

  test('it should NOT register user with email in use', async () => {
    const data = {
      name: 'Testing User',
      email: 'test@testing.com',
      password: '123abc',
    };

    const error = await api.post('/signup', data).catch(e => e.response);
    expect(error.status).toBe(400);
    expect(error.data).toEqual({ error: expect.any(String) });
  });

  test('it should NOT signin with wrong credentials', async () => {
    const data = {
      email: 'test@testing.com',
      password: '123',
    };

    const error = await api.post('/signin', data).catch(e => e.response);
    expect(error.status).toBe(401);
    expect(error.data).toEqual({ error: 'Invalid email or password' });
  });

  test('it should signin with correct credentials', async () => {
    const data = {
      email: 'test@testing.com',
      password: '123abc',
    };

    const res = await api.post('/signin', data);
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ token: expect.any(String) });
    setTokenEnv(res.data.token);
  });
});
