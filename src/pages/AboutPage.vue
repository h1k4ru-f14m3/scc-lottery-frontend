<script setup>
import { ref } from 'vue'
import AgentsList from '@/components/agent/agentsList.vue'

const prizeIMGs = ref([
  ['First Prize', 'https://res.cloudinary.com/dzx6dedea/image/upload/v1765446461/first_c3gjan.jpg'],
  ['Second Prize', 'https://res.cloudinary.com/dzx6dedea/image/upload/v1765446461/Secound_mxvtxo.jpg'],
  ['Third Prize', 'https://res.cloudinary.com/dzx6dedea/image/upload/v1765446461/third_zkd2r9.jpg'],
])
  // Outside image for About section
const aboutImage = 'https://res.cloudinary.com/dzx6dedea/image/upload/v1765446460/banner_bmt6e9.jpg'
</script>

<template>
  <div class="pt-[5em] flex flex-col justify-center items-center gap-10">

    <!-- PAGE TITLE -->
    <h1 class="text-[3em] font-black text-shadow-md font-shan">
      ဝႂ်သုၼ်ႇလီ
    </h1>

    <!-- ABOUT SECTION (TEXT LEFT, IMAGE RIGHT) -->
    <section class="w-full grid grid-cols-1 md:grid-cols-2 gap-10 p-5 items-center">

      <!-- LEFT TEXT -->
      <div>
        <h1 class="text-[2.5em] font-black text-shadow-md font-shan">
          ယိူင်းဢၢၼ်း ဝႂ်သုၼ်ႇလီ
        </h1>

        <h2 class="text-[1.5em] text-shadow-md mb-3 font-shan">
          တႃႇတေမေႇသၢင်ႈ ၵၢၼ်ပၢႆးပၺ်ႇၺႃႇၸိူဝ်ႉၶိူဝ်းတႆး
        </h2>

        <p
          class="text-[1.25em] leading-relaxed text-shadow-md font-shan text-justify"
        >
          ၼႂ်းၵၢၼ်သၢင်ႈပၢႆးပၺ်ႇၺႃႇၸိူဝ်ႉၶိူဝ်းတႆးၼႆႉ ႁႅင်းငဝ်ႈတိုၼ်းတႃႇပွင်ၵၢၼ်မၼ်း
          တေၸႂ်ယႂ်ႇ ၸဝ်ႈတႃႇၼႃႉၽူႈလူႇတၢၼ်း ၵေႃႈဢမ်ႇယိုၼ်းယၢဝ်း။ တေၸႂ်ယႂ်ႇဢဵၼ်ႁႅင်း
          ၵႃႊႁဵၼ်းတီႈပေႃႈမႄႈ လုၵ်ႈႁဵၼ်းၵေႃႈ သမ်ႉၺႃးၶၢဝ်းၽွင်းတႆးတူၵ်းၵိၼ်းၼႆလႄႈ
          ၵေႃတႆး ၸင်ႇၶူင်ႊဝူၼ်ႉ လၢႆးႁူမ်ႈတိုၼ်း ဢၼ်မီးတၢင်းမုင်ႇမွင်း
          ၽွၼ်းလႆႈၶိုၼ်းၼၼ်ႉယူႇဢေႃႈ။
        </p>
      </div>

      <!-- RIGHT IMAGE -->
      <div class="flex justify-center md:justify-end">
        <img
        :src="https://res.cloudinary.com/dzx6dedea/image/upload/v1765446460/banner_bmt6e9.jpg"
        alt="About Image"
        class="w-full max-w-md h-[25em] object-cover rounded-xl shadow-lg"
        />
      </div>

    </section>

    <!-- PRIZES SECTION -->
    <h1 class="text-[3em] font-black text-shadow-md font-shan">Prizes</h1>

    <section class="flex flex-wrap w-full justify-center gap-5 p-5">
      <div
        v-for="(item, index) in prizeIMGs"
        :key="index"
        class="bg-primary w-[20em] h-[20em] rounded-lg overflow-hidden shadow-md"
      >
        <img
          :src="item[1]"
          :alt="item[0]"
          class="w-full h-full object-cover border-4 border-primary rounded-lg"
        />
        <p class="w-full text-center mt-2 text-lg font-bold">{{ item[0] }}</p>
      </div>
    </section>

    <!-- AGENTS SECTION -->
    <AgentsList />

  </div>
</template>
