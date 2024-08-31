<script setup lang="ts">
import { ref, watch } from "vue";
import { _axios, apiEndpoints } from '../../../global/global';
import { noteSchema } from "../../../../shared/schemas/noteSchema";
import { T_EditNote, T_Note } from "../../../../shared/types/T_Note.ts";
import { clientTouchYStore } from "../../store/clientTouchY";
import { notesStore } from "../../store/notes.ts";
import { notesInputStore } from "../../store/notesInput.ts";
import { CachedCommands } from "../../utils/cachedCommands.ts";
import { formDataToObj } from "../../utils/formDataToObj.ts";
import formHandler from "../../utils/formHandler";

const clientTouchY = clientTouchYStore();
const notesInput = notesInputStore();
const notes = notesStore();

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
    onFailure: (res, data) => {
        const content = formDataToObj(data) as T_EditNote | T_Note;
        const cachedCommands = new CachedCommands();
        
        if(notesInput.isEditMode) {
            //@ts-ignore
            cachedCommands.edit({
                type: 'edit',
                content
            })
            notes.editNote(content)
        } else {
            cachedCommands.add({
                type: 'create',
                content
            })
            notes.addNote(content)
        }
    
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
            :value='notesInput.defaultValues.title'
        />
        <textarea
            class="textarea w-full min-h-[100px] bg-black-800"
            placeholder="enter your note.."
            name="text"
            cols="20"
            rows="5"
            :value='notesInput.defaultValues.text'
        ></textarea>
        <button
            type='submit'
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
