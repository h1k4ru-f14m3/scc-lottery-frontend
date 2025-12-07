<script setup>
import allOrdersView from '@/components/admin/allProcessingView.vue'
import AllUsersView from '@/components/admin/allUsersView.vue'
import simpleButton from '@/components/general_components/simpleButton.vue'
import simpleModal from '@/components/general_components/simpleModal.vue'
import { ref } from 'vue'
import setRole from '@/components/admin/setRole.vue'
import BoughtView from '@/components/views/boughtView.vue'
import infiniteList from '@/components/general_components/infiniteList.vue'
import card from '@/components/general_components/card.vue'
// import hamburgerMenu from '@/components/nav/hamburgerMenu.vue'
import addTickets from '@/components/admin/modals/tickets/addTickets.vue'

const showModal = ref(false)
function setModal(val) {
  showModal.value = val
}
</script>

<template>
  <div class="pt-[5em]">
    <!-- <all-orders-view></all-orders-view> -->
    <!-- <AllUsersView></AllUsersView> -->
    <!-- <BoughtView :is-agent="true"></BoughtView> -->
    <!-- <infinite-list route="/" query="" :component-to-use="card"></infinite-list> -->
    <!-- <hamburger-menu></hamburger-menu> -->

    <addTickets></addTickets>

    <!-- <simpleButton
      @click-extra="setModal(true)"
      button-title="Open Modal"
      bg-color="btn btn-warning shadow-md h-[1.5em] m-0"
    ></simpleButton>
    <addTickets :show_modal="showModal" @close_modal="setModal(false)"></addTickets> -->

    <!-- <simpleModal
      modal-title="Verfication Image"
      :img_view="true"
      :img_src="'/src/assets/qr_codes/qr_code_placeholder.png'"
      :show-modal="showModal"
      @close-modal="setModal(false)"
    ></simpleModal> -->
  </div>
</template>
