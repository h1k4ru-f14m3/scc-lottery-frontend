<script setup>
import simpleTable from '../general_components/simpleTable.vue'
import simpleButton from '../general_components/simpleButton.vue'
import simpleModal from '../general_components/simpleModal.vue'
import setRole from './setRole.vue'
import { ref, onMounted } from 'vue'
import { getData } from '@/helpers'
import { formSubmit } from '@/helpers'

const modalBtnProps = {
  'button-title': 'Set role',
  'bg-color': 'btn btn-warning shadow-md h-[1.5em] m-0',
  onClickExtra: toggleModal,
}

// Prepare Form Div
const res_message = ref()

async function handleSetRole(val) {
  console.log('This is the role data: ', val)
  await formSubmit(val, res_message, '/user/set_role', false, false)

  if (res_message.value === 'refresh') {
    toggleModal(val)
    await getData('/user/', response)
  }
}

const response = ref({ data: [], personal_info: [] })
onMounted(async () => {
  await getData('/user/', response)
})

const id_to_edit = ref(0)

const showModal = ref(false)
function toggleModal(val) {
  if (!showModal.value) {
    showModal.value = true
  } else if (showModal.value) {
    showModal.value = false
  }

  id_to_edit.value = val[0]
  // console.log('ID To Edit: ', id_to_edit.value)
}
</script>

<template>
  <div>
    <simpleTable
      :theads="['User ID', 'Name', 'Role', 'Actions']"
      :trows="response.data"
      :use_extra_components="true"
      :extra_components="[
        {
          component: simpleButton,
          props: modalBtnProps,
          key: 'extraData',
          dataList: response.data,
        },
      ]"
    ></simpleTable>

    <simpleModal
      :show-modal="showModal"
      @close-modal="toggleModal"
      :use_extra_components="true"
      :extra_component="[
        {
          component: setRole,
          props: {
            onSubmitRole: handleSetRole,
          },
          key: 'id',
          dataList: [id_to_edit],
        },
      ]"
    ></simpleModal>
  </div>
</template>
