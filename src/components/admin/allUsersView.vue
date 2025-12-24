<script setup>
import simpleTable from '../general_components/simpleTable.vue'
import simpleButton from '../general_components/simpleButton.vue'
import simpleModal from '../general_components/simpleModal.vue'
import setRole from './setRole.vue'
import { ref, onMounted } from 'vue'
import { getData, formSubmit } from '@/helpers'
import addUsers from './modals/users/addUsers.vue'
import editUser from './modals/users/editUser.vue'
import pagination from '../general_components/pagination.vue'
import search from '../general_components/search.vue'
import { nextTick } from 'vue'
import api from '@/api'

const props = defineProps({
  limit: Number,
})

const modalBtnProps = {
  'button-title': 'Edit',
  'bg-color': 'btn btn-warning shadow-md m-0',
  onClickExtra: toggleEditModal,
}
const delBtnProps = {
  'button-title': 'Delete',
  'bg-color': 'btn btn-warning shadow-md m-0',
  onClickExtra: handleDelUser,
}

// Prepare Form Div
const res_message = ref()

async function handleEdit() {
  toggleEditModal('0')
  await getData('/user/', response)
}

const offset = ref(null)
const query = ref(null)
const resetPage = ref(false)
const handlePageChange = async (data) => {
  await getData('/user/', response, data, query.value, query.value ? 'name' : null)
}
const handleSearch = async (data) => {
  query.value = data
  console.log('QUERY: ', data)

  resetPage.value = true
  await nextTick()
  resetPage.value = false

  if (!data) {
    await getData('/user/', response)
    return
  }
  await getData('/user/', response, offset.value, data, 'name')
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
  let res = await formSubmit(data, mes_response, '/user/add_user', false, false)
  console.log('RES: ', res)
  const resultData = res

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

async function handleDelUser(data) {
  console.log('DELETE USER ID: ', data[0])
  const res = await api.post('/user/del_user', { id: data[0] })
  const resultData = res.data

  console.log('RESULT DATA: ', resultData)

  if (resultData.success) {
    await getData('/user/', response, offset.value, search.value, 'code')
  }
}
</script>

<template>
  <div>
    <div class="flex flex-col w-full justify-center fixed bg-base-100 z-10 p-3">
      <simpleModal
        :show-modal="showAddModal"
        @close-modal="toggleAddModal"
        :use_extra_components="true"
        :extra_component="[
          {
            component: addUsers,
            props: {
              onAdduser: handleAddUser,
              response_obj: mes_response,
            },
          },
        ]"
      ></simpleModal>

      <div>
        <search @got-input="handleSearch" placeholder="Name: "></search>
      </div>

      <div class="flex justify-center">
        <simpleButton
          bg-color="btn btn-primary"
          button-title="Add Users"
          @click-extra="toggleAddModal"
        ></simpleButton>
      </div>
    </div>
    <!-- DATA TABLE -->
    <div class="pt-[10em]">
      <simpleTable
        :theads="['User ID', 'Name', 'Role', 'Phone Number', 'Address', 'Edit', 'Delete']"
        :trows="response.data"
        :use_extra_components="true"
        :extra_components="[
          {
            component: simpleButton,
            props: modalBtnProps,
            key: 'extraData',
            dataList: response.data,
          },
          {
            component: simpleButton,
            props: delBtnProps,
            key: 'extraData',
            dataList: response.data,
          },
        ]"
      ></simpleTable>
    </div>

    <div class="m-3 flex flex-row items-center justify-center">
      <pagination
        @page-change="handlePageChange"
        :disable-next="response.data.length !== props.limit"
        :limit="limit"
        :reset="resetPage"
      ></pagination>
    </div>

    <simpleModal
      :show-modal="showEditModal"
      @close-modal="toggleEditModal"
      :use_extra_components="true"
      :extra_component="[
        {
          component: editUser,
          props: {
            onSubmitEdit: handleEdit,
          },
          key: 'id',
          dataList: [id_to_edit],
        },
      ]"
    ></simpleModal>
  </div>
</template>
