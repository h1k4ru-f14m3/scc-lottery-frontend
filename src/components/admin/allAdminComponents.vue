<script setup>
import { TabGroup, Tab, TabList, TabPanels, TabPanel } from '@headlessui/vue'
import allOrdersView from './allProcessingView.vue'
import allUsersView from './allUsersView.vue'
import allOrderRecords from './allOrderRecords.vue'
import allTickets from './allTickets.vue'

const limit = 15
</script>

<template>
  <TabGroup>
    <div class="flex w-full items-center justify-center mb-4 pt-5">
      <TabList class="tabs tabs-box self-center">
        <Tab class="tab focus:outline-none">Tickets</Tab>
        <Tab class="tab focus:outline-none">Records</Tab>
        <Tab class="tab focus:outline-none">Processing</Tab>
        <Tab class="tab focus:outline-none">Users</Tab>
      </TabList>
    </div>
    <TabPanels class="md:w-[98vw] md:h-[75vh] overflow-auto">
      <TabPanel :key="tickets">
        <allTickets class="w-[98vw] h-[75vh]" :limit="limit"></allTickets>
      </TabPanel>
      <TabPanel :key="records">
        <allOrderRecords class="w-[98vw] h-[75vh]" :limit="limit"></allOrderRecords>
      </TabPanel>
      <TabPanel :key="processing">
        <allOrdersView class="w-[98vw] h-[75vh]" :limit="limit"></allOrdersView>
      </TabPanel>
      <TabPanel :key="users">
        <allUsersView class="w-[98vw] h-[75vh]" :limit="limit"></allUsersView>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
