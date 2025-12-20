<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/api'
import simpleButton from '@/components/general_components/simpleButton.vue'
import { vAutoAnimate } from '@formkit/auto-animate'

const props = defineProps({
  code: [Number, String],
})

const emits = defineEmits(['submitEdit'])
</script>

<template></template>
