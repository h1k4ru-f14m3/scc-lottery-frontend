<script setup>
import { TabGroup, Tab, TabList, TabPanels, TabPanel } from '@headlessui/vue'
import allOrdersView from './allProcessingView.vue'
import allUsersView from './allUsersView.vue'
import allOrderRecords from './allOrderRecords.vue'
import allTickets from './allTickets.vue'
import simpleButton from '../general_components/simpleButton.vue'
</script>

<template>
  <TabGroup>
    <div class="flex w-full items-center justify-center mb-4">
      <TabList class="tabs tabs-box self-center">
        <Tab class="tab focus:outline-none">Tickets</Tab>
        <Tab class="tab focus:outline-none">Records</Tab>
        <Tab class="tab focus:outline-none">Processing</Tab>
        <Tab class="tab focus:outline-none">Users</Tab>
      </TabList>
    </div>
    <TabPanels class="md:w-[98vw] md:h-[75vh] overflow-auto">
      <TabPanel :key="tickets">
        <allTickets class="w-[98vw] h-[75vh]"></allTickets>
      </TabPanel>
      <TabPanel :key="records">
        <allOrderRecords class="w-[98vw] h-[75vh]"></allOrderRecords>
      </TabPanel>
      <TabPanel :key="processing">
        <allOrdersView class="w-[98vw] h-[75vh]"></allOrdersView>
      </TabPanel>
      <TabPanel :key="users">
        <allUsersView class="w-[98vw] h-[75vh]"></allUsersView>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
