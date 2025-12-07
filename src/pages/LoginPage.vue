<script setup>
import formDiv from '@/components/form/formDiv.vue'
import { ref } from 'vue'
import authFormSubmit from '@/helpers'

const response = ref(null)

const handleData = (data) => {
  authFormSubmit(data, response, '/login')
}
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <formDiv title="Login" button-title="Login" @submit="handleData" :message="response" />
  </div>
</template>
