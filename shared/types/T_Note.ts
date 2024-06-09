export type T_Note = {
    title: string;
    text: string;
}
export type T_EditNote = T_Note & { oldTitle: string }
export type T_DeleteNote = { title: T_Note['title'] }