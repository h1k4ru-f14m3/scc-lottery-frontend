<script setup>
import { ref } from 'vue';
import agentsList from '@/components/agent/agentsList.vue';

const prizeIMGs = ref([
  ['First Prize', '/src/assets/prizes/prize-1.jpg'],
  ['Second Prize', '/src/assets/prizes/prize-2.jpg'],
  ['Third Prize', '/src/assets/prizes/prize-3.jpg'],
])
</script>

<template>
  <div class="pt-[5em] flex flex-row flex-wrap justify-center gap-5">
    <h1 class="text-[3em] font-black text-shadow-md font-shan">ဝႂ်သုၼ်ႇလီ</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
<div>
<h2 class="text-3xl font-semibold mb-4">About</h2>
<p class="text-gray-700 leading-relaxed" v-html="aboutText"></p>
</div>


<div class="flex justify-center md:justify-end">
<img
:src="aboutImage"
:alt="aboutImageAlt"
class="w-full max-w-md rounded-2xl shadow-lg object-cover"
loading="lazy"
/>
</div>
</div>
    <h1 class="text-[3em] font-black text-shadow-md font-shan">Prizes</h1>
    <section class="flex flex-row w-full items-center gap-2 p-5">
      <div class="bg-primary w-[42em] h-[25em] rounded-lg" v-for="item in prizeIMGs">
        <img :src="item[1]" :alt="item[0]" class="w-full h-full object-cover rounded-lg border-4 border-primary"></img>
        <p class="w-full text-center mt-3">{{ item[0] }}</p>
      </div>
    </section>

    <!-- <h1 class="text-[3em] font-black text-shadow-md mb-3 self-center">Agents</h1> -->
     <agents-list></agents-list>

  </div>
</template>
