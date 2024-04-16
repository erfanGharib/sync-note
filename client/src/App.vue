<script setup lang="ts">
import PlusButton from './components/PlusButton.vue';
import NoteInputWrapper from './components/input/NoteInputWrapper.vue';
import NoteList from './components/list/NoteList.vue';

</script>

<template>
    <div class='flex flex-col md:px-6 px-4 h-full'>
        <h1 class='text-2xl font-bold mb-2 text-orange-100'>Sync Note</h1>
        <NoteList />
    </div>

    <NoteInputWrapper />

    <PlusButton />
</template>
