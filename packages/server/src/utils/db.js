import mongoose from 'mongoose';

export default async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
  } catch (e) {
    console.log(e);
  }
};
