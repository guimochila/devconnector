import faker from 'faker';

export default function setup() {
  const req = {
    body: {},
  };
  const res = {};
  Object.assign(res, {
    status: jest.fn(
      function status() {
        return this;
      }.bind(res),
    ),
    json: jest.fn(
      function json() {
        return this;
      }.bind(res),
    ),
    send: jest.fn(
      function send() {
        return this;
      }.bind(res),
    ),
  });
  const next = jest.fn();

  return { req, res, next };
}

export function generateUser() {
  return {
    name: faker.name,
    email: faker.internet.email,
    password: faker.internet.password,
  };
}
