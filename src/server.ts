import 'reflect-metadata'

import express, { Request, Response, NextFunction, response } from 'express';
import 'express-async-errors';

import routes from './routes'
import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    })
});

app.listen(3333, () => {
    console.log('Server started')
});