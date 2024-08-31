<script setup lang="ts">
import { T_ApiCommand } from '../../shared/types/T_ApiCommand';
import { T_KeyAsPropNameMap } from '../../shared/types/T_KeyAsPropNameMap';
import { _axios, apiEndpoints } from '../global/global';
import OfflineModeBanner from './components/OfflineModeBanner.vue';
import PlusButton from './components/PlusButton.vue';
import ReloadButton from './components/ReloadButton.vue';
import NoteInputWrapper from './components/input/NoteInputWrapper.vue';
import NoteList from './components/list/NoteList.vue';
import { notesStore } from './store/notes';
import { offlineModeStore } from './store/offlineMode';
import { CachedCommands } from './utils/cachedCommands';
import { isServerUp } from './utils/isServerUp';
import { registerServiceWorker } from './utils/registerServiceWorker';

const offlineMode = offlineModeStore();

window.addEventListener('online', () => offlineMode.changeMode(false));
window.addEventListener('offline', () => offlineMode.changeMode(true));

const syncCommands = () => {
    const cachedCommands = new CachedCommands();
    const data = new FormData;

    data.append('commands', JSON.stringify(cachedCommands.get()))
    
    _axios.post(apiEndpoints.commands, data)
    .then(() => cachedCommands.remAll())
    .catch((err) => {
        console.error(err);
    })
}

isServerUp();
syncCommands();
registerServiceWorker();

</script>

<template>
    <OfflineModeBanner/>

    <div class='pt-5 md:pt-10 md:w-3/6 w-full mx-auto relative flex flex-col h-full'>
        <div 
            class='flex flex-col md:px-6 px-4 h-full' 
        >
            <div class='f-center-between'>
                <h1 class='text-2xl font-bold mb-2 text-orange-100'>Sync Note</h1>

                <div class='f-center-between gap-x-3'>
                    <ReloadButton />
                </div>
            </div>
            <NoteList />
        </div>

        <NoteInputWrapper />
        <PlusButton />
    </div>
</template>
