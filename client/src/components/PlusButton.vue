<script setup lang='ts'>
import { clientTouchYStore } from '../store/clientTouchY';
import { notesInputStore } from '../store/notesInput';

const clientTouchY = clientTouchYStore();
const notesInput = notesInputStore();
</script>

<template>
    <button 
        @click='() => {
            notesInput.emptyValues();
            notesInput.changeMode(false);
            clientTouchY.updateValue(0)
        }' 
        class='f-center click-effect rounded-full bg-red-500 w-14 h-14 p-3 absolute bottom-4 right-4 shadow-lg'
    >
        <v-icon name="hi-plus-sm" scale='1.5' />
    </button>
</template>