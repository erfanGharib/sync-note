import express from 'express';
import { openNotesFolderController } from '../controllers/openNotesFolderController.js';
const openNotesFolderRouter = express.Router();

openNotesFolderRouter.post(
    '/',
    openNotesFolderController
);

export default { baseRoute: '/open-notes-folder', router: openNotesFolderRouter };
