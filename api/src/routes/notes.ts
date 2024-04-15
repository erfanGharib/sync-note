import express from 'express';
import { noteSchema } from '../../../shared/schemas/noteSchema.js';
import { createNoteController, deleteNoteController, getNoteController } from '../controllers/notesController.js';
import { parseForm } from '../middlewares/parseForm.js';
import { validateReqBody } from '../middlewares/validateReqBody.js';
const notesRouter = express.Router();

notesRouter.use(parseForm());

notesRouter.post(
    '/create',
    validateReqBody(noteSchema),
    createNoteController
);

notesRouter.post(
    '/edit', 
    validateReqBody(noteSchema),
    createNoteController
);

notesRouter.post(
    '/delete/:title', 
    validateReqBody({ title: noteSchema.title }),
    deleteNoteController
);

notesRouter.get(
    '/', 
    getNoteController
);

export default { baseRoute: '/notes', router: notesRouter };
