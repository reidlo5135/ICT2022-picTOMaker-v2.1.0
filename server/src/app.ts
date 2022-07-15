import express, {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from "body-parser";
import OAuthRouter from './routes/oauth/OAuthRouter';
import LocalUserRouter from './routes/local/LocalUserRouter';
import S3Router from './routes/s3/S3Router';
import QnaRouter from './routes/qna/QnaRouter';

import {sequelize} from './models';

const app: express.Application = express();
const port = 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/v1/api/oauth2/', OAuthRouter);
app.use('/v1/api/user/', LocalUserRouter);
app.use('/v1/api/picTO/', S3Router);
app.use('/v1/api/qna/', QnaRouter);

app.use(function(req:Request, res:Response, next:NextFunction) {
    next(createError(404));
});

// error handler
app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, async () => {
    console.log(`Express app.ts -> Connected to http://localhost:${port}`);
    await sequelize.authenticate()
        .then(async () => {
            console.log('DB CONNECT SUCCESS');
        })
        .catch((e:Error) => {
            console.error(e);
        })
});

module.exports = app;
