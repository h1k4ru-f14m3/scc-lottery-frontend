<script setup>
import allAdminComponents from '@/components/admin/allAdminComponents.vue'
import { getData } from '@/helpers'
import { onMounted, ref } from 'vue'

const admin_check = ref(false)
onMounted(async () => {
  await getData('/is_admin', admin_check)
})
</script>

<template>
  <div class="flex flex-col justify-center items-center sm:p-4 md:p-8 md:pt-[5em] pt-[5em]">
    <div v-if="admin_check.success">
      <allAdminComponents></allAdminComponents>
    </div>
    <div v-else>
      <p>You are not an admin!</p>
    </div>
  </div>
</template>
