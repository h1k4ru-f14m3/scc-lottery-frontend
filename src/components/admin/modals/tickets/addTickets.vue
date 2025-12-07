<script setup>
import { ref } from 'vue'
import { FormKit } from '@formkit/vue'
import simpleButton from '@/components/general_components/simpleButton.vue'

function login(data) {
  console.log('SUP! ', data)
}
</script>

<template>
  <!-- <FormKit type="form" submit-label="Login" @submit="login">
    <FormKit name="email" label="Email address" validation="required|email" />
    <FormKit type="password" name="password" label="Password" validation="required" />
  </FormKit> -->
  <FormKit
    type="search"
    :sections-schema="{
      suffix: 'TEST',
    }"
  ></FormKit>
</template>
