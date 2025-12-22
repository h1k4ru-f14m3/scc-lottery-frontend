<script setup>
import { ref } from 'vue';
import agentsList from '@/components/agent/agentsList.vue';
import CardsPreview from '@/components/general_components/cardsPreview.vue';
import card from '@/components/general_components/card.vue';

const prizeIMGs = ref([
  ['First Prize', 'https://res.cloudinary.com/dzx6dedea/image/upload/v1765446461/first_c3gjan.jpg'],
  ['Second Prize', 'https://res.cloudinary.com/dzx6dedea/image/upload/v1765446461/Secound_mxvtxo.jpg'],
  ['Third Prize', 'https://res.cloudinary.com/dzx6dedea/image/upload/v1765446461/third_zkd2r9.jpg'],
])
</script>

<template>
  <div class="pt-[5em] flex flex-row flex-wrap justify-center gap-5">
    <h1 class="text-[3em] font-black text-shadow-md font-shan">ဝႂ်သုၼ်ႇလီ ဝၼ်းၵေႃႇတင်ႈမုၵ်ႉၸုမ်း"ၵေႃတႆး" 27 ပီႊတဵမ်</h1>
   <section class="w-full min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-5 md:py-20">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
    
    <!-- LEFT SIDE: TEXT CONTENT -->
    <div class="space-y-8 order-2 lg:order-1">
      <!-- Main Title -->
      <div class="space-y-4">
        <h1 class="font-shan text-4xl md:text-5xl lg:text-6xl font-black bg-clip-text 
                     bg-gradient-to-r from-amber-900 to-orange-700 leading-tight
                     drop-shadow-lg animate-fade-in">
          ယိူင်းဢၢၼ်း ဝႂ်သုၼ်ႇလီ
        </h1>
        </br>
        <h2 class="text-xl md:text-2xl font-shan text-amber-900/90 leading-snug
                     drop-shadow-md animate-fade-in-delay">
          တႃႇတေမေႇသၢင်ႈ ၵၢၼ်ပၢႆးပၺ်ႇၺႃႇၸိူဝ်ႉၶိူဝ်းတႆး
        </h2>
      </div>

      <!-- Description Box with Glassmorphism Effect -->
      <div class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 
                      rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500">
        </div>
        <div class="relative bg-white/90 backdrop-blur-md border border-amber-200 
                      rounded-2xl p-8 shadow-xl">
          <p class="text-lg md:text-xl leading-relaxed text-amber-950 font-shan">
            ၼႂ်းၵၢၼ်သၢင်ႈပၢႆးပၺ်ႇၺႃႇၸိူဝ်ႉၶိူဝ်းတႆးၼႆႉ ႁႅင်းငဝ်ႈတိုၼ်းတႃႇပွင်ၵၢၼ်မၼ်း တေၸႂ်ယႂ်ႇ ၸဝ်ႈတႃႇၼႃႉၽူႈလူႇတၢၼ်း ၵေႃႈဢမ်ႇယိုၼ်းယၢဝ်း။ 
            တေၸႂ်ယႂ်ႇဢဵၼ်ႁႅင်း ၵႃႊႁဵၼ်းတီႈပေႃႈမႄႈ လုၵ်ႈႁဵၼ်းၵေႃႈ သမ်ႉၺႃးၶၢဝ်းၽွင်းတႆးတူၵ်းၵိၼ်းၼႆလႄႈ 
            ၵေႃတႆး ၸင်ႇၶူင်ႊဝူၼ်ႉ လၢႆးႁူမ်ႈတိုၼ်း ဢၼ်မီးတၢင်းမုင်ႈမွင်း ၽွၼ်းလႆႈၶိုၼ်းၼၼ်ႉယူႇဢေႃႈ။ 
            ၵၢၼ်ႁူမ်ႈတိုၼ်း ဢၼ်မီးတၢင်းမုင်ႈမွင်းၽွၼ်းလႆႈၶိုၼ်းၼၼ်ႉ ပဵၼ်ၵၢၼ်ဢၼ်ၵူႊၵေႃႉ တေၸူမ်းသိူဝ်း ႁူမ်ႈသၢင်ႈပႃးၸွမ်းၼႆၼၼ်ႉယဝ်ႉၶႃႈ။
          </p>
        </div>
      </div>

      <!-- Optional decorative element -->
      <div class="flex justify-start">
        <div class="h-1 w-32 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full"></div>
      </div>
    </div>

    <!-- RIGHT SIDE: IMAGE with floating effect -->
    <div class="flex justify-center lg:justify-end order-1 lg:order-2">
  <div class="relative">
    <!-- Soft glow background -->
    <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 
                  rounded-3xl blur-3xl opacity-30 -z-10 scale-110"></div>
    <!-- Image Container – now fully responsive for landscape images -->
    <div class="w-full max-w-4xl">
      <img
        src="https://res.cloudinary.com/dzx6dedea/image/upload/v1765454140/ticket_zsxm2e.jpg"
        alt="ၵၢၼ်ပၢႆးပၺ်ႇၺႃႇ"
        class="w-full h-auto max-h-[85vh] object-contain rounded-3xl
               shadow-2xl border-8 border-white/90
               hover:scale-[1.02] transition-transform duration-700
               drop-shadow-2xl"
      />
    </div>
  </div>
</div>
  </div>

 <div class="mt-[3em]">
  <CardsPreview
    :component-to-use="card"
    route="/"
    :inherit-classes="`
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      gap-y-6
      gap-x-8
      lg:gap-x-10
      rounded-md
      p-4
      tab-content
      md:max-w-[75vw]
      mx-auto
    `"
  />
</div>

</section>

    <h1 class="text-6xl font-black text-shadow-md">Prizes</h1>
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
