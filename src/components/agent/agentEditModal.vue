<script setup>
import { reactive } from 'vue'
import simpleButton from '../general_components/simpleButton.vue'

const props = defineProps({
  code: Number,
})

const emits = defineEmits(['submitEdit'])

const selectedData = reactive({
    code: props.code,
    note_for: '',
})
</script>

<template>
    <div class="flex flex-col items-center">
        <h1 class="text-[2em] font-black self-center text-shadow-md mb-3">Edit Note</h1>

        <input type="text" class="w-[22em] h-[2.5em] p-2 shadow-md mx-auto input" name="note_for" v-model="selectedData.note_for"></input>

        <simpleButton bg-color="mt-[2em] btn btn-primary self-center" button-title="Edit" @click="emits('submitEdit', selectedData)"></simpleButton>
    </div>
</template>
