<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { apiBaseUrl } from "../../../../shared/global";
import NoteListItem from "./NoteListItem.vue";

const notes = ref([]);
const fetchData = () => {
    axios.get(apiBaseUrl + '/notes')
    .then((res) => {
        console.log(res);
        notes.value = res.data;
    })
}

document.addEventListener('dataFetched', fetchData)
fetchData();

</script>

<template>
    <div class=' overflow-y-auto h-full w-full'>
        <NoteListItem 
            v-for="note in notes" 
            :note='note' 
        />
    </div>
</template>
