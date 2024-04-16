import { defineStore } from "pinia";

interface T_Note {
    text: string;
    title: string;
}

interface T_AllNotes {
    allNotes: T_Note[]
}

export const useNotesStore = defineStore('notes', {
    state: (): T_AllNotes => ({
        allNotes: []
    }),
    actions: {
        addNote(note: T_Note) {
            // if (note.trim() === '') return;

            this.allNotes.push(note)
        },
        deleteNote(NoteId: number) {
            this.allNotes = this.allNotes.filter((_, index) => index !== NoteId);
        },
        tickNote(NoteId: number) {
            this.allNotes[NoteId].isTicked = !this.allNotes[NoteId].isTicked;
        }
    },
})