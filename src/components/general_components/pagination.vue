<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  disableNext: {
    type: Boolean,
    default: false,
  },
  limit: Number,
  reset: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['pageChange'])

const page_num = ref(1)
const offset = computed(() => (page_num.value - 1) * props.limit)

watch(
  () => props.reset,
  (newVal) => {
    if (newVal) {
      page_num.value = 1
    }
  },
)

watch(page_num, () => {
  emits('pageChange', offset.value)
})
</script>

<template>
  <div class="join">
    <button class="join-item btn" @click="page_num !== 1 ? (page_num -= 1) : null">«</button>
    <button class="join-item btn">Page {{ page_num }}</button>
    <button class="join-item btn" @click="disableNext ? null : page_num++">»</button>
  </div>
</template>
