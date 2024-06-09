import { T_DeleteNote, T_EditNote, T_Note } from "./T_Note";

export type T_ApiCommand =
    | { type: 'create'; content: T_Note }
    | { type: 'edit'; content: T_EditNote }
    | { type: 'delete'; content: T_DeleteNote };
