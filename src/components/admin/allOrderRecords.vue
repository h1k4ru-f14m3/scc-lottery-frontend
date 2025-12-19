<script setup>
import simpleTable from '../general_components/simpleTable.vue'
import simpleButton from '../general_components/simpleButton.vue'
import simpleModal from '../general_components/simpleModal.vue'
import { ref, onMounted, nextTick, reactive, computed } from 'vue'
import { getData } from '@/helpers'
import api from '@/api'
import pagination from '../general_components/pagination.vue'
import search from '../general_components/search.vue'

const props = defineProps({
  limit: Number,
})

const imgBtnProps = {
  'button-title': 'Image',
  'bg-color': 'btn btn-warning shadow-md h-[1.5em] m-0',
  onClickExtra: toggleModal,
}

const response = ref({ orders: [], img_data: [] })
onMounted(async () => {
  await getData('/order/load_all', response)
})

const search_filter_options = ['name', 'o.tickets_bought']
const search_filter = reactive({ filter: search_filter_options[0] })
const search_placeholder = computed(() => {
  if (search_filter.filter === search_filter_options[0]) {
    return 'Name: '
  } else if (search_filter.filter === search_filter_options[1]) {
    return 'Ticket Code: '
  }
})

const offset = ref(null)
const query = ref(null)
const handlePageChange = async (data) => {
  offset.value = data
  await getData(
    '/order/load_all',
    response,
    data,
    query.value,
    query.value ? search_filter.filter : null,
  )
}

const resetPage = ref(false)
const handleSearch = async (data) => {
  query.value = data
  console.log('QUERY: ', data)

  resetPage.value = true
  await nextTick()
  resetPage.value = false

  if (!data) {
    await getData('/order/load_all', response)
    return
  }
  await getData('/order/load_all', response, offset.value, data, search_filter.filter)
}

const showModal = ref(false)
const img_to_show = ref(null)

async function toggleModal(extraData) {
  if (!showModal.value) {
    showModal.value = true
  } else if (showModal.value) {
    showModal.value = false
    img_to_show.value = null
  }

  if (extraData) {
    const img_id = { id: extraData }
    console.log('IMG_ID: ', img_id)
    const img_fetch = await api.post('/order/load_img', img_id)
    const img_src = img_fetch.data.img_data[0]
    img_to_show.value = img_src
  }
}
</script>

<template>
  <div>
    <div class="join m-3 flex justify-center">
      <search
        @got-input="handleSearch"
        :placeholder="search_placeholder"
        :join-item="true"
      ></search>

      <select class="select join-item w-5" v-model="search_filter.filter" name="filter">
        <option :value="search_filter_options[0]">Name</option>
        <option :value="search_filter_options[1]">Ticket Code</option>
      </select>
    </div>

    <simpleTable
      :theads="['Order ID', 'Buyer ID', 'Buyer Name', 'Tickets Bought', 'Status', 'Image Link']"
      :trows="response.orders"
      :use_extra_components="true"
      :extra_components="[
        {
          component: simpleButton,
          props: imgBtnProps,
          key: 'extraData',
          dataList: response.img_data,
        },
      ]"
    ></simpleTable>

    <div class="m-3 flex flex-row items-center justify-center">
      <pagination
        @page-change="handlePageChange"
        :limit="limit"
        :disable-next="response.orders.length !== props.limit"
      ></pagination>
    </div>

    <simpleModal
      modal-title="Verfication Image"
      :img_view="true"
      :img_src="img_to_show"
      :show-modal="showModal"
      @close-modal="toggleModal"
    ></simpleModal>
  </div>
</template>
