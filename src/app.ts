import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import HttpError from './helpers/http-error';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: {
      message: 'Not found',
    },
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode;
  if (err instanceof HttpError) {
    statusCode = (err as HttpError).getStatusCode();
  } else {
    statusCode = 500;
  }
  res.status(statusCode).json({
    error: {
      message:
        process.env.NODE_ENV === 'production' && statusCode === 500
          ? 'Internal server error'
          : err.message,
    },
  });
});

export default app;
