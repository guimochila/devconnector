import 'dotenv/config';
import app from './server';
import connectDB from './utils/db';

const start = async () => {
  // Connect to database
  await connectDB();

  const port = process.env.PORT;

  app.listen(port, () => {
    /* eslint-disable-next-line */
    console.log(`Server started on http://localhost:${port}/`);
  });
};

start();
