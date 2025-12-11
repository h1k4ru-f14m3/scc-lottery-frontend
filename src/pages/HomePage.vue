<script setup>
import { ref, watch } from 'vue'
import cartView from '@/components/views/cartView.vue'
import { getData } from '@/helpers'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import allCards from '@/components/views/allCardsView.vue'
import cartModal from '@/components/cart/cartModal.vue'
import { currentTabIndex } from '@/stores/ui'
import PaymentDiv from '@/components/form/paymentDiv.vue'
import { bought_data, root_response } from '@/stores/tempSessions'
import { formSubmit } from '@/helpers'
import boughtView from '@/components/views/boughtView.vue'
import { vAutoAnimate } from '@formkit/auto-animate'
import search from '@/components/general_components/search.vue'

// const user_session = ref(null)

// watch(response, (newVal) => {
//   //   console.log(response.value.user_session)
// })

const message_res = ref()

getData('/', root_response)
getData('/bought_data', bought_data)

const handleConfirmCart = async (data) => {
  await formSubmit(data, message_res, '/cart/confirm', true)
  currentTabIndex.value = 0
  console.log(message_res)
}

const showPayment = ref(false)
const handleShowPayment = (val) => {
  showPayment.value = val
}

watch(
  () => root_response.value,
  (newVal) => {
    console.log('Hello!')
    console.log('Root Response: ', newVal)
  },
)

const queryToSearch = ref('')
function handleInput(val) {
  queryToSearch.value = val
}

// watch(
//   () => currentTabIndex.value,
//   async (newVal) => {
//     if (newVal === 1) {
//       await getData('/bought_data', bought_data)
//     }
//   },
// )
</script>

<template>
  <!-- <p>{{ root_response }}</p> -->

  <div class="flex justify-center md:justify-end">
        <img
        :src="https://res.cloudinary.com/dzx6dedea/image/upload/v1765446460/banner_bmt6e9.jpg"
        alt="About Image"
        class="w-full max-w-md h-[25em] object-cover rounded-xl shadow-lg"
        />
      </div>

  <div
    v-if="root_response.user_session.id"
    class="flex flex-col items-center justify-center pt-[5em]"
  >
    <TabGroup :selected-index="currentTabIndex" @change="currentTabIndex = $event">
      <!-- Tablist -->
      <div class="flex items-center justify-center mb-4">
        <TabList class="tabs tabs-box self-center">
          <Tab class="tab focus:outline-none">All</Tab>
          <Tab class="tab focus:outline-none">Bought</Tab>
          <Tab class="tab focus:outline-none">Cart</Tab>
        </TabList>
      </div>

      <search v-if="currentTabIndex === 0" @got-input="handleInput"></search>

      <TabPanels class="md:w-[98vw] overflow-auto">
        <!-- All available tickets tab -->
        <TabPanel :key="'all'" v-auto-animate>
          <allCards
            route-to-fetch="/"
            :query="queryToSearch"
            decorative-classes="flex flex-wrap gap-2 border-2 border-base-200 rounded-md p-4 tab-content overflow-auto max-h-[70vh] justify-center items-center"
          />
          <cartModal :show-b-t-n="showPayment.value"></cartModal>
        </TabPanel>

        <!-- Bought tickets tab -->
        <TabPanel :key="'bought'">
          <boughtView
            :is-agent="
              root_response.user_session.role === 'agent' ||
              root_response.user_session.role === 'admin'
            "
            class="w-[98vw] h-[75vh]"
          ></boughtView>
        </TabPanel>

        <!-- Cart/Payment Tab -->
        <TabPanel class="flex justify-center" :key="'cart'">
          <div class="w-[95vw] md:w-[50vw]">
            <cartView @show="handleShowPayment" />

            <PaymentDiv :show="showPayment.value" @confirm="handleConfirmCart"></PaymentDiv>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>

  <div v-else class="pt-[5em] flex flex-col items-center justify-center">
    <search v-if="currentTabIndex === 0" @got-input="handleInput"></search>

    <div class="md:w-[98vw] overflow-auto">
      <!-- All available tickets tab -->
      <allCards
        route-to-fetch="/"
        :query="queryToSearch"
        decorative-classes="flex flex-wrap gap-2 border-2 border-base-200 rounded-md p-4 overflow-auto max-h-[80vh] justify-center items-center"
      />
    </div>
  </div>
</template>
