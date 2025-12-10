<script setup>
import { ref } from 'vue'
import formDiv from '@/components/form/formDiv.vue'
import authFormSubmit from '@/helpers'

const props = defineProps({
  response_obj: {
    type: Object,
    default: ref(null),
  },
})

const emits = defineEmits(['adduser'])

const formInputs = [
  { name: 'name', label: 'Name:' },
  { name: 'phone_number', label: 'Phone Number:' },
  { name: 'password', label: 'Password:', type: 'password' },
  { name: 'confirm_password', label: 'Confirm Password:', type: 'password' },
]

const handleAddUser = async (data) => {
  emits('adduser', data)
}
</script>

<template>
  <formDiv
    :inputs="formInputs"
    button-title="Add User"
    title="Add User"
    @submit="handleAddUser"
    :message="props.response_obj"
    :no_bg="true"
  ></formDiv>
</template>
