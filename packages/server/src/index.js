import 'dotenv/config';
import app from './server';
import connectDB from './utils/db';
import logger from './utils/logger';

const start = async () => {
  // Connect to database
  await connectDB();

  const port = process.env.PORT;

  app.listen(port, () => {
    logger.info(`Server started on http://localhost:${port}/`);
  });
};

start();
