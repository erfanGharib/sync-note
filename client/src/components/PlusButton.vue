<script setup lang='ts'>
import { clientTouchYStore } from '../store/clientTouchY';

const clientTouchY = clientTouchYStore();
</script>

<template>
    <button 
        @click='clientTouchY.updateValue(0)' 
        class='f-center rounded-full bg-red-500 w-14 h-14 p-3 absolute bottom-4 right-4 shadow-lg'
    >
        <v-icon name="hi-plus-sm" scale='1.5' />
    </button>
</template>