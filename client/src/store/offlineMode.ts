import { defineStore } from "pinia";

export const offlineModeStore = defineStore('offlineMode', {
    state: () => ({ isOfflineMode: false }),
    actions: {
        changeMode(newValue: boolean) {
            this.isOfflineMode = newValue;
        },
    },
})