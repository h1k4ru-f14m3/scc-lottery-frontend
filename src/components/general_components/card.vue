<script setup>
import simpleButton from './simpleButton.vue'

const props = defineProps({
  code: String,
})
</script>

<template>
  <div class="rounded-md w-[21em] h-[15em] shadow-glow-md bg-base-200">
    <div
      class="bg-[url('/src/assets/background/cardBG.jpg')] bg-cover bg-center flex rounded-t-md w-[21em] h-[10em] justify-center items-center"
    >
      <!-- <img src="/src/assets/background/cardBG.jpg" alt="Background " class="object-cover"></img> -->
      <p
        class="text-5xl text-primary-content"
        style="
          text-shadow:
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000;
        "
      >
        {{ String(code).padStart(5, '0') }}
      </p>
    </div>
    <div class="h-[5em] flex justify-center items-center">
      <simpleButton
        button-title="Add to cart"
        bg-color="btn btn-neutral shadow-md transition hover:opacity-75"
        hover=""
        :code="props.code"
        route-to-run="/cart/add"
        redirect-on-fail="/login"
      />
    </div>
  </div>
</template>
