import mongoose from 'mongoose';
import logger from './logger';

export default async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  } catch (e) {
    logger.error(`MongoDB: ${e}`);
  }
};
