const jwt = require('jsonwebtoken');
const { generateToken } = require('../auth');

describe('Authentication:', () => {
  describe('generateToken', () => {
    test('generates new JWT from user', () => {
      const id = 123;
      const token = generateToken({ id });
      const user = jwt.verify(token, process.env.JWT_SECRET);

      expect(user.id).toBe(id);
    });
  });
});
