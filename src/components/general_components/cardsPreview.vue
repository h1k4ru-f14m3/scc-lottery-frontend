<script setup>
import { onMounted, ref } from 'vue'
import simpleButton from './simpleButton.vue'
import api from '@/api'

const props = defineProps({
  route: String,
  componentToUse: Object,
  skeletonComponent: Object,
  inheritClasses: String,
})

const response = ref({ data: [] })
onMounted(async () => {
  const fetch_res = await api.get('/', { params: { limit: 6 } })
  response.value = fetch_res.data
})
</script>

<template>
  <div class="w-full flex justify-center">
    <h1 class="font-black text-6xl mb-3">Cards Preview</h1>
    <div :class="props.inheritClasses">
      <component
        :is="props.componentToUse"
        v-for="item in response.data"
        :key="item[0]"
        :code="item[0]"
      ></component>
      <simpleButton
        button-route="/shop"
        bg-color="btn btn-primary text-2xl shadow-lg m-3 transition rounded-md ease-in-out hover:-translate-y-1 hover:scale-110"
        :use-default="false"
        button-title="See More..."
      ></simpleButton>
    </div>
  </div>
</template>
