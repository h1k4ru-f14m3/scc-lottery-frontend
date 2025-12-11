<script setup>
import { ref } from 'vue';
import agentsList from '@/components/agent/agentsList.vue';

const prizeIMGs = ref([
  ['First Prize', 'https://res.cloudinary.com/dzx6dedea/image/upload/v1765446461/first_c3gjan.jpg'],
  ['Second Prize', 'https://res.cloudinary.com/dzx6dedea/image/upload/v1765446461/Secound_mxvtxo.jpg'],
  ['Third Prize', 'https://res.cloudinary.com/dzx6dedea/image/upload/v1765446461/third_zkd2r9.jpg'],
])
</script>

<template>
  <div class="pt-[5em] flex flex-row flex-wrap justify-center gap-5">
    <h1 class="text-[3em] font-black text-shadow-md font-shan">ဝႂ်သုၼ်ႇလီ</h1>
    <div class="w-full p-5">
      <h1 class="text-[2.5em] font-black text-shadow-md font-shan">ယိူင်းဢၢၼ်း ဝႂ်သုၼ်ႇလီ</h1>
      <h2 class="text-[1.5em] text-shadow-md mb-3 font-shan">တႃႇတေမေႇသၢင်ႈ ၵၢၼ်ပၢႆးပၺ်ႇၺႃႇၸိူဝ်ႉၶိူဝ်းတႆး</h2>
      <textarea disabled class="text-[1.25em] text-shadow-md font-shan text-justify w-full md:w-[60vw] h-[35vh] md:h-[25vh] resize-none">
          ၼႂ်းၵၢၼ်သၢင်ႈပၢႆးပၺ်ႇၺႃႇၸိူဝ်ႉၶိူဝ်းတႆးၼႆႉ ႁႅင်းငဝ်ႈတိုၼ်းတႃႇပွင်ၵၢၼ်မၼ်း တေၸႂ်ယႂ်ႇ ၸဝ်ႈတႃႇၼႃႉၽူႈလူႇတၢၼ်း ၵေႃႈဢမ်ႇယိုၼ်းယၢဝ်း။ တေၸႂ်ယႂ်ႇဢဵၼ်ႁႅင်း ၵႃႊႁဵၼ်းတီႈပေႃႈမႄႈ လုၵ်ႈႁဵၼ်းၵေႃႈ သမ်ႉၺႃးၶၢဝ်းၽွင်းတႆးတူၵ်းၵိၼ်းၼႆလႄႈ ၵေႃတႆး ၸင်ႇၶူင်ႊဝူၼ်ႉ လၢႆးႁူမ်ႈတိုၼ်း ဢၼ်မီးတၢင်းမုင်ႇမွင်း ၽွၼ်းလႆႈၶိုၼ်းၼၼ်ႉယူႇဢေႃႈ။ ၵၢၼ်ႁူမ်ႈတိုၼ်း ဢၼ်မီးတၢင်းမုင်ႈမွင်းၽွၼ်းလႆႈၶိုၼ်းၼၼ်ႉ ပဵၼ်ၵၢၼ်ဢၼ်ၵူႊၵေႃႉ တေၸူမ်းသိူဝ်း ႁူမ်ႈသၢင်ႈပႃးၸွမ်းၼႆၼၼ်ႉယဝ်ႉၶႃႈ။
      </textarea>
    </div>

    <h1 class="text-[3em] font-black text-shadow-md font-shan">Prizes</h1>
    <section class="w-full p-5">
  <h2 class="sr-only">Prizes</h2>

  <!-- responsive grid: 1 col mobile, 2 col small, 3 col lg -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
    <figure
      v-for="(item, idx) in prizeIMGs"
      :key="idx"
      class="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col"
      role="group"
      aria-label="prize card"
    >
      <!-- image area: responsive height, object-cover keeps center crop -->
      <div class="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
        <img
          :src="item[1]"
          :alt="item[0]"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <!-- caption -->
      <figcaption class="px-4 py-3 text-center">
        <p class="text-lg font-semibold">{{ item[0] }}</p>
      </figcaption>
    </figure>
  </div>
</section>

    <!-- <h1 class="text-[3em] font-black text-shadow-md mb-3 self-center">Agents</h1> -->
     <agents-list></agents-list>

  </div>
</template>
