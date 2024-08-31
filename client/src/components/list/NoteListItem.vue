<script setup lang="ts">
import { ref } from 'vue';
import { _axios, apiEndpoints } from '../../../global/global';
import { T_ApiCommand } from '../../../../shared/types/T_ApiCommand';
import { T_Note } from '../../../../shared/types/T_Note';
import { clientTouchYStore } from '../../store/clientTouchY';
import { notesStore } from '../../store/notes';
import { notesInputStore } from '../../store/notesInput';
import { CachedCommands } from '../../utils/cachedCommands';
import { fireDataFetchedEvent } from '../../utils/fireDataFetchedEvent';
import { formDataToObj } from '../../utils/formDataToObj';
import { isMobileDevice } from '../../utils/isMobileDevice';

defineProps<{ note: T_Note }>();

const clientTouchY = clientTouchYStore();
const notesInput = notesInputStore();
const notes = notesStore();

const isHovered = ref(false);
const isCollapsed = ref(false);
const buttons = [
    {
        onclick: (note: T_Note) => {
            clientTouchY.updateValue(0)
            notesInput.changeMode(true)
            notesInput.updateValues({
                ...note,
                oldTitle: note.title
            })
        },
        iconName: "md-modeedit-outlined"
    },
    {
        onclick: async (note: T_Note) => {
            if(!confirm(`Are you sure you want to delete \`${note.title}\``)) return;

            const data = new FormData();
            data.append('title', note.title);

            await _axios.post(apiEndpoints.notes.delete, data)
            .finally(() => {
                fireDataFetchedEvent();
            })
            .catch(() => {
                const content = formDataToObj(data) as T_ApiCommand['content'];
                const cachedCommands = new CachedCommands();
                cachedCommands.rem(content.title)
                notes.deleteNote(note.title)
            })  
        },
        iconName: "fa-regular-trash-alt"
    },
];

</script>

<template>
    <div
        class="note-container p-3 md:p-4 f-center-between w-full rounded-lg mt-2 text-orange-100 bg-black-800 justify-between" 
        @mouseenter='isHovered = true'
        @mouseleave='isHovered = false'
    >
        <div 
            @click='isCollapsed = !isCollapsed'
            class='flex flex-col w-[73%]'
        >
            <h3 class='text-md'>
                {{ note.title }}
            </h3>
            <span class='opacity-50 w-full md:w-[120%] hyphens-auto' :class='isCollapsed ? "break-words " : "text-ellipsis overflow-hidden whitespace-nowrap"'>
                {{ note.text }}
            </span>
        </div>

        <div 
            class="f-start-end gap-2 w-1/4 -translate-x-1 transition-all opacity-100"
            :class='isMobileDevice() || isHovered ? "" : "!translate-x-0 !opacity-0"'
        >
            <button
                @click='button.onclick(note)'
                v-for="button in buttons"
                class='p-2 f-center border rounded-lg bg-black-800 hover:bg-orange-50 hover:bg-opacity-5 transition-all border-orange-50 border-opacity-30'
            >
                <v-icon :name="button.iconName" :scale="0.9" />
            </button>
        </div>
    </div>
</template>
