import { defineStore } from "pinia";

export const clientTouchYStore = defineStore('clientTouchY', {
    state: () => ({ value: -100 }),
    actions: {
        updateValue(newValue: number) {
            this.value = newValue;
        },
    },
})