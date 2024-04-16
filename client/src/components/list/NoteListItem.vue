<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { apiBaseUrl } from '../../../../shared/global';
import { T_Notes } from '../../../../shared/types/T_Notes';
import { fireDataFetchedEvent } from '../../utils/fireDataFetchedEvent';
import { isMobileDevice } from '../../utils/isMobileDevice';

defineProps<{ note: T_Notes }>();

const isHovered = ref(false);
const isCollapsed = ref(false);
const buttons = [
    {
        onclick: () => {console.log('edit')},
        iconName: "md-modeedit-outlined"
    },
    {
        onclick: (title: string) => {
            axios.post(`${apiBaseUrl}/notes/delete/${title}`, { title })
            fireDataFetchedEvent();
        },
        iconName: "fa-regular-trash-alt"
    },
];

</script>

<template>
    <div
        class="p-3 md:p-4 f-center-between w-full rounded-lg mt-2 text-orange-100 bg-black-800 justify-between" 
        @mouseenter='isHovered = true'
        @mouseleave='isHovered = false'
        @click='isCollapsed = !isCollapsed'
    >
        <div class='flex flex-col w-[73%]'>
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
                @click='button.onclick(note.title)'
                v-for="button in buttons"
                class='p-2 f-center border rounded-lg bg-black-800 hover:bg-orange-50 hover:bg-opacity-5 transition-all border-orange-50 border-opacity-30'
            >
                <v-icon :name="button.iconName" :scale="0.9" />
            </button>
        </div>
    </div>
</template>
