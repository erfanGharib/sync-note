<script setup lang="ts">
import { _axios, apiEndpoints } from '../../shared/global';
import PlusButton from './components/PlusButton.vue';
import NoteInputWrapper from './components/input/NoteInputWrapper.vue';
import NoteList from './components/list/NoteList.vue';

const openNotesFolder = () => {
    _axios.post(apiEndpoints.openNotesFolder)
}
</script>

<template>
    <div class='flex flex-col md:px-6 px-4 h-full'>
        <div class='f-center-between'>
            <h1 class='text-2xl font-bold mb-2 text-orange-100'>Sync Note</h1>
            <button 
                class='click-effect text-xs mb-1.5' 
                @click='openNotesFolder'
            >
                Open Notes Folder
            </button>
        </div>
        <NoteList />
    </div>

    <NoteInputWrapper />

    <PlusButton />
</template>
