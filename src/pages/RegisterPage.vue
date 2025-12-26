<script setup>
import formDiv from '@/components/form/formDiv.vue'
import navBar from '@/components/nav/navBar.vue'
import { ref } from 'vue'
import authFormSubmit from '@/helpers'

const response = ref(null)

const formInputs = [
  { name: 'name', label: 'ၸိုဝ်ႈတဵမ် (Full Name):' },
  { name: 'phone_number', label: 'မၢႆၽူင်း (Phone Number):' },
  { name: 'address', label: 'တီႈယူႇ (Address):' },
  { name: 'password', label: 'မၢႆလပ်ႉ (Password):', type: 'password' },
  { name: 'confirm_password', label: 'သႂ်ႇမၢႆထႅင်ႈၵမ်း (Confirm Password):', type: 'password' },
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
