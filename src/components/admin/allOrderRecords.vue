<script setup>
import simpleTable from '../general_components/simpleTable.vue'
import simpleButton from '../general_components/simpleButton.vue'
import simpleModal from '../general_components/simpleModal.vue'
import { ref, onMounted } from 'vue'
import { getData } from '@/helpers'

const imgBtnProps = {
  'button-title': 'Image',
  'bg-color': 'btn btn-warning shadow-md h-[1.5em] m-0',
  onClickExtra: toggleModal,
}

const response = ref({ orders: [], img_data: [] })
onMounted(async () => {
  await getData('/order/load_all', response)
})

const showModal = ref(false)
const img_to_show = ref(null)

function toggleModal(extraData) {
  if (!showModal.value) {
    showModal.value = true
  } else if (showModal.value) {
    showModal.value = false
  }
  img_to_show.value = extraData
}
</script>

<template>
  <div>
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
    <simpleModal
      modal-title="Verfication Image"
      :img_view="true"
      :img_src="img_to_show"
      :show-modal="showModal"
      @close-modal="toggleModal"
    ></simpleModal>
  </div>
</template>
