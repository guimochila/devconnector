import jwt from 'jsonwebtoken';
import {
  blacklist,
  escape,
  isAlphanumeric,
  isEmail,
  isLength,
  normalizeEmail,
} from 'validator';
import User from '../resources/user/user.model';

export const generateToken = user => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
};

export const signup = async (req, res, next) => {
  let { name, email } = req.body;
  const { password } = req.body;

  const error = [];

  if (!name || !isAlphanumeric(blacklist(name, ' '))) {
    error.push(
      'Name is required and only alpha numeric characters are allowed.',
    );
  }

  if (!email || !isEmail(email)) {
    error.push('A valid email is required.');
  }

  if (!password || !isLength(password, { min: 6, max: 50 })) {
    error.push(
      'Password is required and must contain between 6 and 50 characters.',
    );
  }

  if (error.length) {
    return res.status(400).json({ data: { error } });
  }

  email = normalizeEmail(email, { all_lowercase: true });
  name = escape(name);

  try {
    const user = await User.create({ email, name, password });
    const token = generateToken(user);

    return res.status(201).json({ token });
  } catch (e) {
    if (e.message.includes('E11000 duplicate key error collection')) {
      return res.status(400).json({ data: { error: 'Email already in use' } });
    }
    return next(e);
  }
};

export const signin = () => {};
