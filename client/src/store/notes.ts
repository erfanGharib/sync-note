import { defineStore } from "pinia";
import { T_EditNote } from "../../../shared/types/T_Note";

interface T_Note {
    text: string;
    title: string;
}

interface T_AllNotes {
    allNotes: T_Note[]
}

export const notesStore = defineStore('notes', {
    state: (): T_AllNotes => ({
        allNotes: []
    }),
    actions: {
        addNote(note: T_Note) {
            if (note.title.trim() === '') return;

            this.allNotes.push(note);
        },
        setValue(notes: Array<T_Note>) {
            this.allNotes = notes
        },
        deleteNote(title: string) {
            this.allNotes = this.allNotes.filter((val) => val.title !== title);
        },
        editNote(note: T_EditNote) {
            console.log('edit', note);
            
            for (let index = 0; index < this.allNotes.length; index++) {
                if(this.allNotes[index].title !== note.oldTitle) continue;

                delete note.oldTitle;
                
                this.allNotes[index] = note;
                break;
            }
        }
    },
})