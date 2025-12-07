<script setup>
import { reactive } from 'vue'

const props = defineProps({
  id: Number,
})

const emits = defineEmits(['submitRole'])

const selectedData = reactive({
  role: '',
  id: props.id,
})
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-[2em] font-black self-center text-shadow-md mb-3">Set Role</h1>

    <select v-model="selectedData.role" class="select focus:outline-none mb-3" name="role">
      <option disabled value="">Pick a role</option>
      <option value="admin">Admin</option>
      <option value="agent">Agent</option>
      <option value="user">User</option>
    </select>

    <button class="btn btn-primary w-[7.5em]" @click="emits('submitRole', selectedData)">
      Submit
    </button>
  </div>
</template>
