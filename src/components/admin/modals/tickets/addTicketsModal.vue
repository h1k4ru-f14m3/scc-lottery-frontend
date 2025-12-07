<script setup>
import simpleModal from '@/components/general_components/simpleModal.vue'

const props = defineProps({
  show_modal: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['close_modal'])
</script>

<template>
  <simpleModal
    :show-modal="props.show_modal"
    @close-modal="emits('close_modal')"
    modal-title="SUP!"
  ></simpleModal>
</template>
