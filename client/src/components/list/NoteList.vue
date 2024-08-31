<script setup lang="ts">
import { nextTick, ref } from "vue";
import { _axios, apiEndpoints } from '../../../global/global';
import { notesStore } from "../../store/notes";
import { isServerUp } from "../../utils/isServerUp";
import NoteListItem from "./NoteListItem.vue";
import { CachedCommands } from "../../utils/cachedCommands";

const container = ref(null);
const isScrolled = ref(false);
const cachedCommands = new CachedCommands();
const notes = notesStore();

const fetchData = async () => {
    isServerUp()
    
    try {
        const res = await _axios.get(apiEndpoints.notes.get)
        
        notes.setValue(res.data);
        
        const commands = cachedCommands.get();
        for (let index = 0; index < commands.length; index++) {
            const val = commands[index];
            const cmds = {
                create: {
                    methodName: 'addNote',
                    args: [val.content]
                },
                delete: {
                    methodName: 'deleteNote',
                    args: [val.content.title]
                },
                edit: {
                    methodName: 'editNote',
                    args: [val.content]
                }
            }
            const currentCmd = cmds[val.type];
            notes[currentCmd.methodName](...currentCmd.args)

            await nextTick();
        }
        
        await nextTick();
        handleScrollBar()
    } catch(err) {
        console.error('Error fetching data:', err);
    }
}

const handleScrollBar = () => {
    const elem = container.value;
    isScrolled.value = elem.scrollHeight > elem.clientHeight;
}

document.addEventListener('dataFetched', fetchData)
fetchData();

</script>

<template>
    <div 
        ref='container'
        :class='isScrolled ? "pr-2" : ""'
        class='overflow-y-auto h-full w-full'
    >
        <NoteListItem 
            v-for="note in notes.allNotes" 
            :note='note' 
        />

        <div 
            v-if='notes.allNotes.length <= 0'
            class='opacity-50 w-full py-8 capitalize text-center'
        >
            no note added yet.
        </div>
    </div>
</template>
