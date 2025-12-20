<script setup>
import { onMounted, ref, watch } from 'vue'
import { getData, search } from '@/helpers'
import { vInfiniteScroll } from '@vueuse/components'

const props = defineProps({
  route: String,
  query: {
    type: String,
    default: '',
  },
  componentToUse: Object,
  skeletonComponent: Object,
  inheritClasses: String,
  inheritLayout: String,
})

const scrollContainer = ref(null)
const response = ref({ data: [] })
const offset = ref(0)
const batchSize = 28
const hasMore = ref(true)

const isInitialLoading = ref(true)
const isLoadingMore = ref(false)
const isSearching = ref(false)

onMounted(async () => {
  isInitialLoading.value = true
  await getData(props.routeToFetch, response)
  isInitialLoading.value = false
})

watch(
  () => props.query,
  async (val) => {
    isLoadingMore.value = true
    isSearching.value = true
    console.log('GOT NEW SEARCH QUERY all: ', val)
    offset.value = 0

    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = 0
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!val) {
      await getData(props.routeToFetch, response, offset.value)
      hasMore.value = true
    } else if (val) {
      await search(props.routeToFetch, val, offset.value, response)
      hasMore.value = true
    }

    if (response?.value?.data?.length < batchSize) {
      hasMore.value = false
    }

    isLoadingMore.value = false
    isSearching.value = false
  },
)

async function onLoadMore() {
  if (!hasMore.value || isLoadingMore.value) return

  isLoadingMore.value = true

  offset.value += batchSize
  let newBatch
  if (props.query) {
    newBatch = await search(props.routeToFetch, props.query, offset.value)
  } else if (!props.query) {
    newBatch = await getData(props.routeToFetch, props.query, offset.value)
  }

  console.log('NEW BATCH: ', newBatch)
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (newBatch?.data?.data?.length) {
    console.log('NEW BATCH 2: ', newBatch)
    response.value.data.push(...newBatch.data.data)
  } else {
    hasMore.value = false
  }

  isLoadingMore.value = false
}
</script>

<template>
  <div
    :class="props.inheritClasses"
    ref="scrollContainer"
    v-infinite-scroll="[onLoadMore, { distance: 100 }]"
  >
    <div v-if="isInitialLoading" class="flex flex-wrap gap-2 justify-center items-center">
      <component :is="props.skeletonComponent" v-for="n in 8" :key="n"></component>
    </div>

    <div v-else>
      <div
        class="flex flex-wrap gap-2 justify-center items-center transition-opacity duration-300"
        :class="{ 'opacity-50 pointer-events-none': isSearching }"
      >
        <component
          :is="props.componentToUse"
          v-for="item in response.data"
          :key="item[0]"
          :code="item[0]"
        ></component>
      </div>

      <div class="flex flex-wrap gap-2 justify-center items-center" v-if="isLoadingMore && hasMore">
        <component :is="props.skeletonComponent" v-for="n in 8" :key="n"></component>
      </div>
    </div>
  </div>
</template>
