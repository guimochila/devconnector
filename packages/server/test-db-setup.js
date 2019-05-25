import connectDB from './src/utils/db';

const mongoURI = 'mongodb://localhost:27017/devconnector-app-test';
let mongodb;

function setEnvVar() {
  process.env.MONGODB_URI = mongoURI;
  process.env.JWT_SECRET = 'P2AJEB2hbf12x';
  process.env.PORT = process.env.PORT || 3000;
}

beforeAll(async () => {
  setEnvVar();
  mongodb = await connectDB();
});

afterAll(async () => {
  await mongodb.connection.db.dropDatabase();
  await mongodb.disconnect();
});
