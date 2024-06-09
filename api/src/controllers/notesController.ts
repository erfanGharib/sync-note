import { Request, Response } from 'express';
import { T_DeleteNote, T_EditNote, T_Note } from '../../../shared/types/T_Note';
import { NotesService } from '../services/notesService.js';
import { catchServiceErrors } from '../utils/catchServiceErrors.js';

const notesService = new NotesService();

export const createNoteController = async ({ body }: { body: T_Note }, res) => {
    catchServiceErrors(res, 'Error creating file', () => {
        return res.send(notesService.create(body));
    })
}

export const editNoteController = async ({ body }: { body: T_EditNote }, res) => {
    catchServiceErrors(res, 'Error editing file', () => {
        return res.send(notesService.edit(body));
    })
}

export const getNoteController = (req: Request, res: Response) => {
    catchServiceErrors(res, 'Error getting file', () => {
        return res.send(notesService.get());
    })
}

export const deleteNoteController = ({ body }: { body: T_DeleteNote }, res: Response) => {
    catchServiceErrors(res, 'Error editing file', () => {
        return res.send(notesService.delete(body));
    })
}