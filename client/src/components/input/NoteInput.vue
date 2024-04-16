<script setup lang="ts">
import { ref } from "vue";
import { noteSchema } from "../../../../shared/schemas/noteSchema";
import formHandler from "../../utils/formHandler";
const isFocused = ref(false);

const { send } = formHandler({
    endPoint: '/notes/create',
    resetForm: true,
    validationSchema: noteSchema
})
</script>

<template>
    <form
        @submit.prevent="send"
        class="flex-col f-start gap-y-2 h-full"
    >
        <input
            type="text"
            placeholder="title"
            name="title"
            class="input w-full bg-black-800"
            @focus='isFocused = true'
            @blur='isFocused = false'
        />
        <textarea
            class="textarea w-full min-h-[100px] bg-black-800"
            placeholder="enter your note.."
            name="text"
            cols="20"
            rows="5"
            @focus='isFocused = true'
            @blur='isFocused = false'
        ></textarea>
        <button
            type='submit'
            :class='isFocused ? "" : "!translate-y-0"'
            class=" translate-y-[300%] hover:bg-opacity-80 hover:shadow-[0_5px_15px_#f9731644] transition-all duration-300 p-3 md:p-2 text-orange-200 font-[500] bg-opacity-60 border-opacity-50 border-b-2 border-orange-400 bg-orange-500 rounded-lg md:w-20 w-full ml-auto"
        >
            Add
        </button>
    </form>
</template>
