<script setup>
import { ref } from 'vue'
import api from '@/api'
import formDiv from '@/components/form/formDiv.vue'

const props = defineProps({
  response_obj: {
    type: Object,
    default: () => {
      ref(null)
    },
  },
})

const emits = defineEmits(['addticket'])

const formInputs = [{ name: 'code', label: 'Code' }]

const handleAddTickets = async (data) => {
  emits('addticket', data)
}
</script>

<template>
  <formDiv
    :no_bg="true"
    title="Add Tickets"
    button-title="Add Ticket"
    :inputs="formInputs"
    :message="props.response_obj"
    @submit="handleAddTickets"
  ></formDiv>
</template>
