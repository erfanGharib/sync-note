<script setup lang="ts">
import { ref, watch } from "vue";
import { apiEndpoints } from "../../../../shared/global.ts";
import { noteSchema } from "../../../../shared/schemas/noteSchema";
import { clientTouchYStore } from "../../store/clientTouchY";
import { notesInputStore } from "../../store/notesInput.ts";
import formHandler from "../../utils/formHandler";
import { isMobileDevice } from '../../utils/isMobileDevice.ts';

const isFocused = ref(false);
const clientTouchY = clientTouchYStore();
const notesInput = notesInputStore();

const endPoint = () => (
    notesInput.isEditMode 
        ? apiEndpoints.notes.edit
        : apiEndpoints.notes.create
)

const formHandlerArgs = ref({
    endPoint: endPoint(),
    resetForm: true,
    onSuccess: () => {
        clientTouchY.updateValue(-100)
    },
    validationSchema: noteSchema
})
let _formHandler = formHandler(formHandlerArgs.value)

watch(notesInput, () => {
    formHandlerArgs.value.endPoint = endPoint()
    _formHandler = formHandler(formHandlerArgs.value)
})

</script>

<template>
    <form
        @submit.prevent="_formHandler.send"
        class="flex-col f-start gap-y-2 h-full"
    >
        <input
            v-if='notesInput.isEditMode'
            type="text"
            name="oldTitle"
            hidden
            :value='notesInput.defaultValues.oldTitle'
        />
        <input
            type="text"
            placeholder="title"
            name="title"
            class="input w-full bg-black-800"
            @focus='isFocused = true'
            @blur='isFocused = false'
            :value='notesInput.defaultValues.title'
        />
        <textarea
            class="textarea w-full min-h-[100px] bg-black-800"
            placeholder="enter your note.."
            name="text"
            cols="20"
            rows="5"
            @focus='isFocused = true'
            @blur='isFocused = false'
            :value='notesInput.defaultValues.text'
        ></textarea>
        <button
            type='submit'
            :class='
                isMobileDevice() 
                    ? isFocused ? "" : "!translate-y-[300%]" 
                    : ""
            '
            class=" translate-y-0 hover:bg-opacity-80 hover:shadow-[0_5px_15px_#f9731644] transition-all duration-300 p-3 md:p-2 text-orange-200 font-[500] bg-opacity-60 border-opacity-50 border-b-2 border-orange-400 bg-orange-500 rounded-lg md:w-20 w-full ml-auto"
        >
            {{ 
                notesInput.isEditMode 
                ? 'Edit'
                : 'Add'
            }}
        </button>
    </form>
</template>
