import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { parseForm } from './middlewares/parseForm.js';
import { _commandsRouter } from './routes/commands.js';
import { _notesRouter } from './routes/notes.js';
import { createHttpError } from './utils/createHttpError.js';
import { env } from 'process';

const app = express();
const port = env.PORT || 5000;
const routes = [
	_notesRouter,
	_commandsRouter,
]

const handle404 = (req, res, next) => {
	res.status(404).send(createHttpError(404));
}
const handleErrors = (err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.send(err);
}

export const bootstrapServer = async () => {
	const isDevMode = process.env.NODE_ENV === 'development';

	// if(isDevMode) {
		app.use(cors({ origin: `*` }))
	// }

	app.use(morgan('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(parseForm());
	
	app.get('/is-server-up', (req, res) => res.json('yes'));

	routes.forEach(({ baseRoute, router }) => {
		app.use(baseRoute, router)
	})

	if(!isDevMode) {
		app.use(express.static(path.join(process.cwd(), '../client/dist')))
		app.get('/*', (req, res) => {
			res.sendFile(path.join(process.cwd(), '../client/dist/index.html'))
		})
	}

	app.use(handleErrors);
	app.use(handle404);

	app.listen(port, () => {
		console.log(`Server running at https://localhost:${port}/`);
	});
}
