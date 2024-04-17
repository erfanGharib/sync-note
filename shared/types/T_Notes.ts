export type T_Notes = {
    title: string;
    text: string;
}
export type T_EditNotes = T_Notes & { oldTitle: string }