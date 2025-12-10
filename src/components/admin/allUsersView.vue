<script setup>
import simpleTable from '../general_components/simpleTable.vue'
import simpleButton from '../general_components/simpleButton.vue'
import simpleModal from '../general_components/simpleModal.vue'
import setRole from './setRole.vue'
import { ref, onMounted } from 'vue'
import { getData, formSubmit } from '@/helpers'
import AddUsers from './modals/users/addUsers.vue'

const modalBtnProps = {
  'button-title': 'Edit User',
  'bg-color': 'btn btn-warning shadow-md m-0',
  onClickExtra: toggleEditModal,
}

// Prepare Form Div
const res_message = ref()

async function handleSetRole(val) {
  console.log('This is the role data: ', val)
  await formSubmit(val, res_message, '/user/set_role', false, false)

  if (res_message.value === 'refresh') {
    toggleEditModal(val)
    await getData('/user/', response)
  }
}

const response = ref({ data: [], personal_info: [] })
onMounted(async () => {
  await getData('/user/', response)
})

const id_to_edit = ref(0)

const showEditModal = ref(false)
function toggleEditModal(val) {
  if (!showEditModal.value) {
    showEditModal.value = true
  } else if (showEditModal.value) {
    showEditModal.value = false
  }

  id_to_edit.value = val[0]
  // console.log('ID To Edit: ', id_to_edit.value)
}

const showAddModal = ref(false)
function toggleAddModal() {
  if (!showAddModal.value) {
    showAddModal.value = true
  } else if (showAddModal.value) {
    showAddModal.value = false
  }
}

const mes_response = ref(null)
async function handleAddUser(data) {
  let res = await formSubmit(data, mes_response, '/user/add_user')
  console.log('RES: ', res)
  const resultData = res.data

  if (resultData.success) {
    await getData('/user/', response)
    toggleAddModal()
  } else {
    response.value = resultData.message
    setTimeout(() => {
      response.value = null
    }, 2000)
  }
}
</script>

<template>
  <div>
    <div class="flex w-full justify-center fixed bg-base-100 z-10 p-3">
      <simpleModal
        :show-modal="showAddModal"
        @close-modal="toggleAddModal"
        :use_extra_components="true"
        :extra_component="[
          {
            component: AddUsers,
            props: {
              onAdduser: handleAddUser,
              response_obj: mes_response,
            },
          },
        ]"
      ></simpleModal>

      <simpleButton
        bg-color="btn btn-primary"
        button-title="Add Users"
        @click-extra="toggleAddModal"
      ></simpleButton>
    </div>

    <!-- DATA TABLE -->
    <div class="pt-[5em]">
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
    </div>

    <simpleModal
      :show-modal="showEditModal"
      @close-modal="toggleEditModal"
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
