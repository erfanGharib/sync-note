import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import { env } from 'process';
import { clientAddress, serverAddress } from '../../shared/global.js';
import { createHttpError } from './utils/createHttpError.js';

const app = express();

const handle404 = (req, res, next) => {
	next(createHttpError(404));
}
const handleErrors = (err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.send(err);
}
const setupRoutes = () => {
	const routesDir = path.resolve('./dist/api/src/routes');
	
	return new Promise((resolve) => { 
		try {
			fs.readdirSync(routesDir)
				?.forEach(async (val, index, arr) => {
					const { default: router } = await import('file://' + path.resolve(routesDir, val));
					app.use(router.baseRoute, router.router);
	
					if(index+1 === arr.length)
						resolve(null);
				})
		} catch (err) {
			throw Error(err);
		}	
	})
}

export const bootstrapServer = async () => {
	env.NODE_ENV === 'production' 
		? app.use('/*', express.static(path.join(process.cwd(), '../../client/dist')))
		: app.use(cors({
			origin: `http://${clientAddress.hostname}:${clientAddress.port}`,
			credentials: true
		}))

	app.use(morgan('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());

	await setupRoutes();

	app.use(handle404);
	app.use(handleErrors);
	app.listen(serverAddress.port, serverAddress.hostname, () => {
		console.log(`Server is Available on http://${serverAddress.hostname}:${serverAddress.port}`);
	})
}
