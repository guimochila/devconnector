import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { model, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import Profile from '../profile/profile.model';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [
      isEmail,
      'Invalid email address. Please, provide a valid email.',
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

function getGravatar(email) {
  const hash = crypto
    .createHash('md5')
    .update(email)
    .digest('hex');
  return `https://gravatar.com/avatar/${hash}?s=200`;
}

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    this.avatar = getGravatar(this.email);
    return next();
  } catch (e) {
    return next(e);
  }
});

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.pre('remove', function removeDocs(next) {
  Profile.deleteOne({ user: this._id }).exec();
  next();
});

export default model('User', userSchema);
