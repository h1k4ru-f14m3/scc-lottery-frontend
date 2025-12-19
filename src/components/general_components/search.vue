<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Search:'
    },
    joinItem: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['gotInput'])
const searchQuery = ref()

const styleClasses = computed(() => {
    if (props.joinItem) {
        return "flex flex-row justify-center"
    } else {
        return "flex flex-row justify-center m-3"
    }
})
</script>

<template>
    <div :class="styleClasses">
        <input class="input" :class="joinItem ? 'join-item' : ''" :placeholder="props.placeholder" v-model="searchQuery" @input="emit('gotInput', searchQuery)"></input>
    </div>
</template>