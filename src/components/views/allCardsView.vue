<script setup>
import { defineProps, ref, Suspense, watch } from 'vue'
import card from '../general_components/card.vue'
import { getData, search } from '@/helpers'
import { vInfiniteScroll } from '@vueuse/components'
import infiniteList from '../general_components/infiniteList.vue'

const props = defineProps({
  routeToFetch: {
    type: String,
    default: '/',
  },

  query: String,

  decorativeClasses: String,
})

// console.log(response)
</script>

<template>
  <suspense>
    <template #default>
      <infinite-list
        :query="props.query"
        :route="props.routeToFetch"
        :component-to-use="card"
        :inherit-classes="props.decorativeClasses"
      ></infinite-list>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </suspense>
</template>
