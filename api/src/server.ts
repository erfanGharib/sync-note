import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { env } from 'process';
import { clientAddress, serverAddress } from '../../shared/global.js';
import { createHttpError } from './utils/createHttpError.js';

const app = express();

export const bootstrapServer = () => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  
  if(env.NODE_ENV === 'production') {
    app.use('/*', express.static(path.join(process.cwd(), '../../client/dist')));
  } else {
    app.use(cors({
      origin: `${clientAddress.hostname}:${clientAddress.port}`
    }))
  }
  
  app.use(function(req, res, next) {
    next(createHttpError(404));
  });
  
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.send(err);
  });

  app.listen(serverAddress.port, serverAddress.hostname, () => {
    console.log(`Server is Available on http://${serverAddress.hostname}:${serverAddress.port}`);
  })
}
