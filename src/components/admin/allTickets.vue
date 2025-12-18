<script setup>
import simpleTable from '../general_components/simpleTable.vue'
import simpleButton from '../general_components/simpleButton.vue'
import simpleModal from '../general_components/simpleModal.vue'
import { ref, onMounted, computed, watch } from 'vue'
import { getData } from '@/helpers'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import api from '@/api'
import AddTickets from './modals/tickets/addTickets.vue'
import pagination from '../general_components/pagination.vue'
import search from '../general_components/search.vue'

const props = defineProps({
  limit: Number,
})

const offset = ref(null)
const query = ref(null)
const response = ref({ data: [] })
onMounted(async () => {
  await getData('/tickets/', response)
})
const handlePageChange = async (data) => {
  offset.value = data
  await getData('/tickets/', response, data, query.value, query.value ? 'code' : null)
}
const handleSearch = async (data) => {
  query.value = data
  console.log('QUERY: ', data)

  if (!data) {
    await getData('/tickets/', response)
    return
  }
  await getData('/tickets/', response, offset.value, data, 'code')
}

const deleteBtnProps = {
  'button-title': 'Delete',
  'bg-color': 'btn btn-warning shadow-md h-[1.5em] m-0',
  onClickExtra: delete_ticket,
}

const editBtnProps = {
  'button-title': 'Edit',
  'bg-color': 'btn btn-warning shadow-md h-[1.5em] m-0',
  onClickExtra: testrun,
}

async function testrun() {
  await getData('/tickets/', response, 0, 'confirmed', 'status')
}

function disableBTNs(row) {
  //   console.log(row)
  return row[3] !== 'available'
}

const filter_options = ['All', 'Available', 'Processing', 'Ordered', 'Confirmed']
const filter = ref('All')
async function fetch_filter(val) {
  console.log('NEW VAL: ', val)
  await getData('/tickets/', response, 0, val, 'status')
}

const showModal = ref(false)
function toggleModal() {
  if (!showModal.value) {
    showModal.value = true
  } else if (showModal.value) {
    showModal.value = false
  }
}

const add_ticket_res = ref(null)
async function handleAddTicket(data) {
  let res = await api.post('/tickets/add_ticket', data)
  const resultData = res.data
  // console.log('Looks Fine I think: ', resultData)

  if (resultData.success) {
    toggleModal()
    await getData('/tickets/', response, 0, data['code'], 'code')
    filter.value = 'N/A'
  } else {
    response.value = resultData.message
    setTimeout(() => {
      response.value = null
    }, 2000)
  }
}

async function delete_ticket(data) {
  let res = await api.post('/tickets/del_ticket', { code: data[0] })
  const resultData = res.data

  console.log('RES DATA: ', resultData)

  if (resultData.success) {
    await getData('/tickets/', response, 0, filter.value, 'status')
  }
}
</script>

<template>
  <div>
    <simpleModal
      :show-modal="showModal"
      @close-modal="toggleModal"
      :use_extra_components="true"
      :extra_component="[
        {
          component: AddTickets,
          props: {
            onAddticket: handleAddTicket,
            response_obj: add_ticket_res,
          },
        },
      ]"
    ></simpleModal>

    <!-- THE TOP BAR WITH THE BUTTONS FOR FILTER AND ADD -->
    <div class="flex flex-col w-full justify-center fixed bg-base-100 z-10 p-3">
      <search @got-input="handleSearch" placeholder="Ticket Code: "></search>
      <div class="flex flex-row items-center justify-center">
        <!-- FILTER SELECTION -->
        <Listbox v-model="filter">
          <ListboxButton>
            <simpleButton bg-color="btn btn-primary" :button-title="filter"> </simpleButton>
          </ListboxButton>
          <ListboxOptions class="menu bg-base-100 rounded-md z-20 shadow-md fixed">
            <ListboxOption
              v-for="filter_item in filter_options"
              :key="filter_item"
              :value="filter_item"
              ><simpleButton
                bg-color="btn btn-primary"
                :button-title="filter_item"
                :extra-data="filter_item"
                @click-extra="fetch_filter"
              >
              </simpleButton
            ></ListboxOption>
          </ListboxOptions>
        </Listbox>

        <!-- ADD TICKETS -->
        <simpleButton
          bg-color="btn btn-primary"
          button-title="Add Tickets"
          @click-extra="toggleModal"
        ></simpleButton>
      </div>
    </div>

    <!-- DATA TABLE -->
    <div class="pt-[10em]">
      <simpleTable
        :disable_func="disableBTNs"
        :theads="['Ticket Code', 'Buyer Name', 'Note For', 'Status', 'Expire At', 'Edit', 'Delete']"
        :trows="response.data"
        :use_extra_components="true"
        :extra_components="[
          {
            component: simpleButton,
            props: editBtnProps,
            key: 'extraData',
            dataList: response.data,
          },
          {
            component: simpleButton,
            props: deleteBtnProps,
            key: 'extraData',
            dataList: response.data,
          },
        ]"
      ></simpleTable>
    </div>

    <div class="m-3 flex flex-row items-center justify-center">
      <pagination
        @page-change="handlePageChange"
        :limit="limit"
        :disable-next="response.data.length !== props.limit"
      ></pagination>
    </div>
  </div>
</template>
