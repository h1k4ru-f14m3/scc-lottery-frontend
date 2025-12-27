<script setup>
import { getData, formSubmit } from '@/helpers'
import { onMounted, ref, computed } from 'vue'
import simpleTable from '../general_components/simpleTable.vue'
import simpleButton from '../general_components/simpleButton.vue'
import simpleModal from '../general_components/simpleModal.vue'
import agentEditModal from '../agent/agentEditModal.vue'

const props = defineProps({
  isAgent: {
    type: Boolean,
    default: false,
  },
})

const editBtnProps = {
  'button-title': 'Edit Note',
  'bg-color': 'btn btn-warning shadow-md h-[1.5em] m-0',
  onClickExtra: toggleModal,
}

const response = ref({ data: [] })
onMounted(async () => {
  await getData('/bought_data', response)
})

const tableHeads = computed(() => {
  return props.isAgent ? ['Ticket Code', 'Status', 'For', 'Action'] : ['Ticket Code', 'Status']
})

const tableRows = computed(() => {
  let return_data = []
  for (let row of response.value.data) {
    return_data.push([row[0], row[1]])
  }
  return return_data
})

const allCodes = computed(() => {
  let return_data = []
  for (let row of response.value.data) {
    return_data.push(row[0])
  }
  return return_data
})

const ticket_to_edit = ref(-1)
const showModal = ref(false)
function toggleModal(val) {
  if (!showModal.value) {
    showModal.value = true
  } else if (showModal.value) {
    showModal.value = false
  }

  if (val) {
    ticket_to_edit.value = val
  }
}

const res_message = ref()
async function handleEdit(val) {
  const res = await formSubmit(val, res_message, '/order/edit_note', false, false)

  if (res.success) {
    toggleModal(val)
    await getData('/bought_data', response)
  }
}
</script>

<template>
  <div class="flex flex-col">
    <simpleTable
      v-if="!props.isAgent"
      :theads="tableHeads"
      :trows="tableRows"
      :code_id_index="0"
    ></simpleTable>
    <simpleTable
      v-else
      :theads="tableHeads"
      :trows="response.data"
      :code_id_index="0"
      :use_extra_components="true"
      :extra_components="[
        {
          component: simpleButton,
          props: editBtnProps,
          key: 'extraData',
          dataList: allCodes,
        },
      ]"
    ></simpleTable>

    <simpleModal
      :show-modal="showModal"
      @close-modal="toggleModal"
      :use_extra_components="true"
      :extra_component="[
        {
          component: agentEditModal,
          props: {
            onSubmitEdit: handleEdit,
          },
          key: 'code',
          dataList: [ticket_to_edit],
        },
      ]"
    ></simpleModal>
  </div>
</template>
