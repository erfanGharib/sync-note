<script setup lang='ts'>
import { offlineModeStore } from '../store/offlineMode';

const offlineMode = offlineModeStore();
</script>

<template>
    <div
        v-if='offlineMode.isOfflineMode'
        class='w-full bg-red-900 text-red-200 capitalize opacity-80 p-2 f-center text-xs'
    >
        Server is Unavailable. offline mode turned on
    </div>
</template>