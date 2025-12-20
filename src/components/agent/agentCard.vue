<script setup>
import api from '@/api'
import { onMounted, ref } from 'vue'

const response = ref({ data: [] })
const img = ref({ img_data: [] })
const loading = ref(true)
onMounted(async () => {
  const res = await api.get('/user/', { params: { q: 'agent', type: 'role', limit: '-1' } })
  response.value = res.data

  const img_fetch = await api.get('/user/load_pfp', { params: { q: 'agent', type: 'role' } })
  img.value = img_fetch.data

  loading.value = false
})
</script>

<template>
  <div v-if="!loading" class="flex flex-col justify-center items-center" v-for="(item, index) in response.data">
    <div class="bg-base-300 w-[10em] h-[10em] rounded-[100em]">
      <img v-if="img.img_data[index]" :src="img.img_data[index]" class="w-full h-full object-cover rounded-[100em]" loading="lazy"></img>
    </div>
    <p class="text-3xl p-1 md:text-5xl font-black md:p-3">{{ item[1] }}</p>
    <p class="text-xl md:text-2xl">{{ item[3] }}</p>
    <p class="text-xl md:text-2xl">{{ item[4] }}</p>
  </div>
  <div v-else class="flex flex-col justify-center items-center" v-for="n in 2">
    <div class="skeleton bg-base-300 w-[10em] h-[10em] rounded-[100em]">
    </div>
    <p class="skeleton skeleton-text text-3xl p-1 md:text-5xl font-black md:p-3">Name</p>
    <p class="skeleton skeleton-text text-xl md:text-2xl">Phone Number</p>
    <p class="skeleton skeleton-text text-xl md:text-2xl">Address</p>
  </div>
</template>
