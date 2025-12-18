<script setup>
import simpleTable from '../general_components/simpleTable.vue'
import simpleButton from '../general_components/simpleButton.vue'
import simpleModal from '../general_components/simpleModal.vue'
import { ref, onMounted } from 'vue'
import { getData } from '@/helpers'
import api from '@/api'
import pagination from '../general_components/pagination.vue'

const props = defineProps({
  limit: Number,
})

const confirmBtnProps = {
  'button-title': 'Confirm',
  'route-to-run': '/order/confirm',
  'bg-color': 'btn btn-warning shadow-md h-[1.5em] m-0',
}

const cancelBtnProps = {
  'button-title': 'Cancel',
  'route-to-run': '/order/cancel',
  'bg-color': 'btn btn-warning shadow-md h-[1.5em] m-0',
}

const imgBtnProps = {
  'button-title': 'Image',
  'bg-color': 'btn btn-warning shadow-md h-[1.5em] m-0',
  onClickExtra: toggleModal,
}

const response = ref({ orders: [], img_data: [] })
onMounted(async () => {
  await getData('/order/', response)
})
const handlePageChange = async (data) => {
  await getData('/order/load_all', response, data)
}

const showModal = ref(false)
const img_to_show = ref(null)

async function toggleModal(extraData) {
  if (!showModal.value) {
    showModal.value = true
  } else if (showModal.value) {
    img_to_show.value = null
    showModal.value = false
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
    <simpleTable
      :theads="[
        'Order ID',
        'Buyer ID',
        'Buyer Name',
        'Tickets Bought',
        'Status',
        'Image Link',
        'Action',
      ]"
      :trows="response.orders"
      :use_extra_components="true"
      :extra_components="[
        {
          component: simpleButton,
          props: imgBtnProps,
          key: 'extraData',
          dataList: response.img_data,
        },
        {
          component: simpleButton,
          props: confirmBtnProps,
          key: 'code',
          dataList: response.orders,
        },
        {
          component: simpleButton,
          props: cancelBtnProps,
          key: 'code',
          dataList: response.orders,
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
