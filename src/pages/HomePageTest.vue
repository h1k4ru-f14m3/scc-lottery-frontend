<script setup>
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/vue'
import allCards from '@/components/views/allCardsView.vue'
import cartModal from '@/components/cart/cartModal.vue'
import boughtView from '@/components/views/boughtView.vue'
import cartView from '@/components/views/cartView.vue'
import paymentDiv from '@/components/form/paymentDiv.vue'

const handleConfirmCart = async (data) => {
  await formSubmit(data, message_res, '/cart/confirm', true)
  // console.log(message_res)
}
</script>

<template>
  <div class="pt-50">
    <div>
      <TabGroup>
        <div>
          <TabList>
            <Tab>All</Tab>
            <Tab>Bought</Tab>
            <Tab>Cart</Tab>
          </TabList>
        </div>
        <TabPanels>
          <TabPanel :key="'all'">
            <allCards route-to-fetch="/"></allCards>
            <cartModal></cartModal>
          </TabPanel>
          <TabPanel :key="'bought'">
            <boughtView></boughtView>
          </TabPanel>
          <TabPanel :key="'cart'">
            <cartView></cartView>
            <paymentDiv @confirm="handleConfirmCart"></paymentDiv>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>
