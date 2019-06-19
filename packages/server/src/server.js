import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import postRouter from './resources/post/post.router';
import profileRouter from './resources/profile/profile.router';
import userRouter from './resources/user/user.router';
import { decodeToken, signin, signup } from './utils/auth';
import { developmentErrors, productionErrros } from './utils/errorHandler';

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

// Middlwares
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  cookieParser(null, {
    httpOnly: true,
    secure: isProduction,
  }),
);
if (!isProduction) {
  app.use(morgan('dev'));
}

// Decode token if any
app.use(decodeToken);

// Routes
app.post('/api/signup', signup);
app.post('/api/signin', signin);
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/post', postRouter);

// Error Handler - Catch errors
if (!isProduction) {
  app.use(developmentErrors);
}

app.use(productionErrros);

export default app;
