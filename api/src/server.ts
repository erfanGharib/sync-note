import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';
import morgan from 'morgan';
import path from 'path';
import { env } from 'process';
import { parseForm } from './middlewares/parseForm.js';
import { createHttpError } from './utils/createHttpError.js';

const privateKey = fs.readFileSync('C:/Users/TOP/Documents/ssl/localhost.key', 'utf8');
const certificate = fs.readFileSync('C:/Users/TOP/Documents/ssl/local.network.crt', 'utf8');
const app = express();

const sslOptions = {
  key: privateKey,
  cert: certificate
}

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
	if(env.NODE_ENV === 'production') {
		app.use(express.static(path.join(process.cwd(), '../client/dist')))
		app.get('/*', (req, res) => {
			res.sendFile(path.join(process.cwd(), '../client/dist/index.html'))
		})
	} else {
		app.use(cors({ origin: `*` }))
	}

	app.use(morgan('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(parseForm())
	
	await setupRoutes();

	app.use(handle404);
	app.use(handleErrors);
	const server = https.createServer(sslOptions, app);

	server.listen(5000, () => {
		console.log('Server running at http://192.168.1.70:5000/');
	});
}
