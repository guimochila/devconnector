import cors from 'cors';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import profileRouter from './resources/profile/profile.router';
import userRouter from './resources/user/user.router';
import { decodeToken, signin, signup } from './utils/auth';
import { developmentErrors, productionErrros } from './utils/errorHandler';

const app = express();

// Middlwares
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

// Decode token if any
app.use(decodeToken);

// Routes
app.use('/api/signup', signup);
app.use('/api/signin', signin);
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);

// Error Handler - Catch errors
if (process.env.NODE_ENV === 'development') {
  app.use(developmentErrors);
}

app.use(productionErrros);

export default app;
