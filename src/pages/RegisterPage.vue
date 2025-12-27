<script setup>
import formDiv from '@/components/form/formDiv.vue'
import navBar from '@/components/nav/navBar.vue'
import { ref } from 'vue'
import authFormSubmit from '@/helpers'

const response = ref(null)

const formInputs = [
  { name: 'name', label: 'Full Name:' },
  { name: 'phone_number', label: 'Phone Number:' },
  { name: 'address', label: 'Address:' },
  { name: 'password', label: 'Password:', type: 'password' },
  { name: 'confirm_password', label: 'Confirm Password:', type: 'password' },
]

const handleSubmit = (data) => {
  authFormSubmit(data, response, '/register')
}
</script>

<template>
  <div class="flex justify-center items-center h-screen font-shan">
    <formDiv
      :inputs="formInputs"
      button-title="Register"
      :use-auth-switch="true"
      auth-switch-message="Already have an account?"
      auth-switch-route="/login"
      auth-switch-route-name="Login"
      title="Register"
      @submit="handleSubmit"
      :message="response"
    />
  </div>
</template>
