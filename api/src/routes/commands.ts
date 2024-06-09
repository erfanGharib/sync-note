import express from 'express';
import { commandsController } from '../controllers/commands.js';
const commandsRouter = express.Router();

commandsRouter.post(
    '/',
    commandsController
);

export const _commandsRouter = { baseRoute: '/commands', router: commandsRouter };
