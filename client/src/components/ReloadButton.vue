<script setup lang='ts'>

const reload = () => window.location.reload();
</script>

<template>
    <button 
        class='click-effect text-xs mb-1 p-1.5 border border-orange-100 rounded-lg border-opacity-30' 
        @click='() => reload()'
    >
        <v-icon name='md-refresh' scale='1' />
    </button>
</template>