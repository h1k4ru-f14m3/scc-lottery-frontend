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
  <div class="flex flex-col items-center justify-center">
    <h1 class="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 leading-tight font-shan">
  မၢႆၸိူဝ်းဢၼ်သိုဝ်ႉလႆႈ
</h1>
    <div :class="props.inheritClasses">
      <component
        :is="props.componentToUse"
        v-for="item in response.data"
        :key="item[0]"
        :code="item[0]"
      ></component>
    </div>
    <div :class="props.inheritClasses">
      <simpleButton
        button-route="/shop"
        bg-color="btn btn-primary text-2xl shadow-lg m-3 transition rounded-md font-shan ease-in-out hover:-translate-y-1 hover:scale-110"
        :use-default="false"
        button-title="သိုပ်ႇတူၺ်း..."
      ></simpleButton>
    </div>
  </div>
</template>
