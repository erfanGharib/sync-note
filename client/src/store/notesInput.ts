import { defineStore } from "pinia";
import { T_EditNotes } from "../../../shared/types/T_Notes";

const notesInputDefaultValues = { 
    oldTitle: '', 
    title: '',
    text: '',
}

interface T_NotesInput {
    isEditMode: boolean,
    defaultValues: T_EditNotes
}

export const notesInputStore = defineStore('notesInput', {
    state: (): T_NotesInput => ({ 
        isEditMode: false,
        defaultValues: notesInputDefaultValues,
    }),
    actions: {
        emptyValues() {
            this.defaultValues = notesInputDefaultValues;
        },
        updateValues(newValues: T_EditNotes) {
            this.defaultValues = newValues;
        },
        changeMode(isEditMode: boolean) {
            this.isEditMode = isEditMode;
        },
    },
})