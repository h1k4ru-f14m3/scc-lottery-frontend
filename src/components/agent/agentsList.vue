<script setup>
import agentCard from './agentCard.vue'
import { ref } from 'vue'

const showTitle = ref(false)
const handleLoaded = (data) => {
  showTitle.value = data
}
</script>

<template>
  <h1
    v-if="showTitle"
    class="text-lg sm:text-xl md:text-3xl lg:text-4xl font-black text-shadow-md mb-3 w-full text-center font-shan"
  >
    ၽူႈတၢင်တူဝ် ၶၢႆဝႂ်သုၼ်ႇလီ
  </h1>
  <agent-card @loaded-agents="handleLoaded"></agent-card>
  <p class="w-full mb-6"></p>
</template>
