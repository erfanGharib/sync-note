import { defineStore } from "pinia";
import { T_EditNote } from "../../../shared/types/T_Note";

const notesInputDefaultValues = { 
    oldTitle: '', 
    title: '',
    text: '',
}

interface T_NoteInput {
    isEditMode: boolean,
    defaultValues: T_EditNote
}

export const notesInputStore = defineStore('notesInput', {
    state: (): T_NoteInput => ({ 
        isEditMode: false,
        defaultValues: notesInputDefaultValues,
    }),
    actions: {
        emptyValues() {
            this.defaultValues = notesInputDefaultValues;
        },
        updateValues(newValues: T_EditNote) {
            this.defaultValues = newValues;
        },
        changeMode(isEditMode: boolean) {
            this.isEditMode = isEditMode;
        },
    },
})