<script setup lang="ts">
import { nextTick, ref } from "vue";
import { _axios, apiEndpoints } from "../../../../shared/global";
import NoteListItem from "./NoteListItem.vue";

const container = ref(null);
const notes = ref([]);
const isScrolled = ref(false);

const fetchData = () => {
    _axios.get(apiEndpoints.notes.get)
    .then(async (res) => {
        console.log(res);
        notes.value = res.data;
        
        await nextTick();
        scrollHandler()
    })
}

const scrollHandler = () => {
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
            v-for="note in notes" 
            :note='note' 
        />
    </div>
</template>
