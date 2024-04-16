<script setup lang='ts'>
import { clientTouchYStore } from '../../store/clientTouchY';
import { isMobileDevice } from '../../utils/isMobileDevice.ts';
import NoteInput from './NoteInput.vue';

const clientTouchY = clientTouchYStore();
const screenH = window.screen.availHeight;
let y1 = 0;
</script>

<template>
    <div 
        class='transition-all duration-500 z-10 w-full md:h-[340px] pt-0 h-[90%] bg-[#111] border-[#333] md:border border-2 !border-b-0 shadow-[0_-5px_25px_#00000077] flex flex-col p-5 !pb-6 rounded-t-2xl absolute'
        :style='{ bottom: `${clientTouchY.value}%` }'
    >
        <div 
            class='f-center h-16'
            @touchstart='(e) => {
                y1 = (e.touches[0].clientY / screenH) * 100
            }'
            @touchmove='(e) => {
                if (((e.touches[0].clientY / screenH) * 100) > y1) {
                    clientTouchY.updateValue(-100);
                }
            }'
        >
            <div 
                v-if='isMobileDevice()'
                class='h-1.5 rounded-full bg-orange-50 bg-opacity-40 w-20'
            ></div>
            <button 
                class='ml-auto my-3'
                v-if='!isMobileDevice()'
                @click='clientTouchY.updateValue(-100)'
            >
                <v-icon name='io-close' scale='1.3' />
            </button>
        </div>
        <NoteInput />
    </div>
</template>