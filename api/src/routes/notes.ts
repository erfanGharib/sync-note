import express from 'express';
import { noteSchema } from '../../../shared/schemas/noteSchema.js';
import { createNoteController, deleteNoteController, editNoteController, getNoteController } from '../controllers/notesController.js';
import { validateReqBody } from '../middlewares/validateReqBody.js';
const notesRouter = express.Router();

notesRouter.post(
    '/create',
    validateReqBody(noteSchema),
    createNoteController
);

notesRouter.post(
    '/edit', 
    validateReqBody({ ...noteSchema, oldTitle: noteSchema.title }),
    editNoteController
);

notesRouter.post(
    '/delete', 
    validateReqBody({ title: noteSchema.title }),
    deleteNoteController
);

notesRouter.get(
    '/', 
    getNoteController
);

export const _notesRouter = { baseRoute: '/notes', router: notesRouter };
