import * as Yup from 'yup';
import { T_ApiCommand } from '../types/T_ApiCommand.js';
import { T_KeyAsPropNameMap } from '../types/T_KeyAsPropNameMap.js';
import { deleteNoteSchema, editNoteSchema, noteSchema } from './noteSchema.js';

const apiCommandBaseSchema: T_KeyAsPropNameMap<T_ApiCommand> = {
    type: Yup.string().required(),
}

export const create_apiCommandSchema = {
    ...apiCommandBaseSchema,
    content: Yup.object().shape(noteSchema),
}

export const edit_apiCommandSchema = {
    ...apiCommandBaseSchema,
    content: Yup.object().shape(editNoteSchema),
}

export const delete_apiCommandSchema = {
    ...apiCommandBaseSchema,
    content: Yup.object().shape(deleteNoteSchema),
}