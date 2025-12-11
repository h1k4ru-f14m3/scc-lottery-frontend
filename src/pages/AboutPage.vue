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
    <div class="w-full p-5">
      <h1 class="text-[2.5em] font-black text-shadow-md font-shan">ယိူင်းဢၢၼ်း ဝႂ်သုၼ်ႇလီ</h1>
      <h2 class="text-[1.5em] text-shadow-md mb-3 font-shan">တႃႇတေမေႇသၢင်ႈ ၵၢၼ်ပၢႆးပၺ်ႇၺႃႇၸိူဝ်ႉၶိူဝ်းတႆး</h2>
      <textarea disabled class="text-[1.25em] text-shadow-md font-shan text-justify w-full md:w-[60vw] h-[35vh] md:h-[25vh] resize-none">
          ၼႂ်းၵၢၼ်သၢင်ႈပၢႆးပၺ်ႇၺႃႇၸိူဝ်ႉၶိူဝ်းတႆးၼႆႉ ႁႅင်းငဝ်ႈတိုၼ်းတႃႇပွင်ၵၢၼ်မၼ်း တေၸႂ်ယႂ်ႇ ၸဝ်ႈတႃႇၼႃႉၽူႈလူႇတၢၼ်း ၵေႃႈဢမ်ႇယိုၼ်းယၢဝ်း။ တေၸႂ်ယႂ်ႇဢဵၼ်ႁႅင်း ၵႃႊႁဵၼ်းတီႈပေႃႈမႄႈ လုၵ်ႈႁဵၼ်းၵေႃႈ သမ်ႉၺႃးၶၢဝ်းၽွင်းတႆးတူၵ်းၵိၼ်းၼႆလႄႈ ၵေႃတႆး ၸင်ႇၶူင်ႊဝူၼ်ႉ လၢႆးႁူမ်ႈတိုၼ်း ဢၼ်မီးတၢင်းမုင်ႇမွင်း ၽွၼ်းလႆႈၶိုၼ်းၼၼ်ႉယူႇဢေႃႈ။ ၵၢၼ်ႁူမ်ႈတိုၼ်း ဢၼ်မီးတၢင်းမုင်ႈမွင်းၽွၼ်းလႆႈၶိုၼ်းၼၼ်ႉ ပဵၼ်ၵၢၼ်ဢၼ်ၵူႊၵေႃႉ တေၸူမ်းသိူဝ်း ႁူမ်ႈသၢင်ႈပႃးၸွမ်းၼႆၼၼ်ႉယဝ်ႉၶႃႈ။
      </textarea>
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
