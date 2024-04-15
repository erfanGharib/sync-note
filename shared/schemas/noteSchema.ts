import * as Yup from 'yup';
import { winFileNameRule } from '../regex.js';
import { T_KeyAsPropNameMap } from '../types/T_KeyAsPropNameMap';
import { T_Notes } from '../types/T_Notes';

export const noteSchema: T_KeyAsPropNameMap<T_Notes> = {
    title: Yup.string().required().max(255).matches(winFileNameRule, { message: 'title must not contain <code>< > : " \ / \ \ | ? *</code> characters' }),
    text: Yup.string().required(),
}