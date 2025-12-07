<script setup>
import { ref, watch } from 'vue'
import { getData, search } from '@/helpers'
import { vInfiniteScroll } from '@vueuse/components'

const props = defineProps({
  route: String,
  query: {
    type: String,
    default: '',
  },
  componentToUse: Object,
  inheritClasses: String,
})

const scrollContainer = ref(null)
const response = ref({ data: [] })
const offset = ref(0)
const batchSize = 28
const hasMore = ref(true)

getData(props.routeToFetch, response)
watch(
  () => props.query,
  (val) => {
    console.log('GOT NEW SEARCH QUERY all: ', val)
    offset.value = 0

    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = 0
    }

    if (!val) {
      // console.log('NOTHING!')
      getData(props.routeToFetch, response, offset.value)
      hasMore.value = true
    } else if (val) {
      // console.log('SOMETHING!')
      search(props.routeToFetch, val, offset.value, response)
      hasMore.value = true
    }
  },
)

async function onLoadMore() {
  if (!hasMore.value) return

  offset.value += batchSize
  let newBatch
  if (props.query) {
    newBatch = await search(props.routeToFetch, props.query, offset.value)
  } else if (!props.query) {
    newBatch = await getData(props.routeToFetch, props.query, offset.value)
  }

  console.log('NEW BATCH: ', newBatch)

  if (newBatch?.data?.data?.length) {
    console.log('NEW BATCH 2: ', newBatch)
    response.value.data.push(...newBatch.data.data)
  } else {
    hasMore.value = falseq
  }
}

function testLoad() {
  console.log('NEW CONTENT NEEDED!')
}
</script>

<template>
  <div
    ref="scrollContainer"
    :class="props.inheritClasses"
    v-infinite-scroll="[onLoadMore, { distance: 10 }]"
  >
    <component
      :is="props.componentToUse"
      v-for="item in response.data"
      :key="item[0]"
      :code="item[0]"
    ></component>
  </div>
</template>
