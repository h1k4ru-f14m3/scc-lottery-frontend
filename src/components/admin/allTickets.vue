<script setup>
import simpleTable from '../general_components/simpleTable.vue'
import simpleButton from '../general_components/simpleButton.vue'
import simpleModal from '../general_components/simpleModal.vue'
import { ref, onMounted, watch } from 'vue'
import { getData } from '@/helpers'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'

const response = ref({ data: [] })
onMounted(async () => {
  await getData('/tickets/', response)
})

const deleteBtnProps = {
  'button-title': 'Delete',
  'bg-color': 'btn btn-warning shadow-md h-[1.5em] m-0',
  onClickExtra: testrun,
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
</script>

<template>
  <div>
    <!-- THE TOP BAR WITH THE BUTTONS FOR FILTER AND ADD -->
    <div class="flex w-full justify-center fixed bg-base-100 z-10 p-3">
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
        @click-extra="testrun"
      ></simpleButton>
    </div>

    <!-- DATA TABLE -->
    <div class="pt-[5em]">
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
  </div>
</template>
