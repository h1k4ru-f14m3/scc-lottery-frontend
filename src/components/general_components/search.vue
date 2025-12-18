<script setup>
import { ref } from 'vue';

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Search:'
    }
})

const emit = defineEmits(['gotInput'])
const searchQuery = ref()
</script>

<template>
    <div class="flex flex-row justify-center m-3">
        <input class="input" :placeholder="props.placeholder" v-model="searchQuery" @input="emit('gotInput', searchQuery)"></input>
    </div>
</template>