import * as Yup from 'yup';
import { winFileNameRule } from '../regex.js';
import { T_KeyAsPropNameMap } from '../types/T_KeyAsPropNameMap';
import { T_DeleteNote, T_EditNote, T_Note } from '../types/T_Note';

export const noteSchema: T_KeyAsPropNameMap<T_Note> = {
    title: Yup.string().required().max(255).matches(winFileNameRule, { message: 'title must not contain <code>< > : " \ / \ \ | ? *</code> characters' }),
    text: Yup.string().required(),
}
export const editNoteSchema: T_KeyAsPropNameMap<T_EditNote> = {
    ...noteSchema,
    oldTitle: noteSchema.title
}
export const deleteNoteSchema: T_KeyAsPropNameMap<T_DeleteNote> = {
    title: noteSchema.title
}