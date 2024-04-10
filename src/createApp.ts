import express, { Express } from 'express';
import userRouter from './routes/users';

export function createApp(): Express {
    const app = express();

    app.use('/users', userRouter);

    return app;
}