<script setup>
import { Dialog, DialogDescription, DialogTitle, DialogPanel } from '@headlessui/vue'
import CartView from '../views/cartView.vue'
import { showModal } from '@/helpers'
import SimpleButton from '@/components/general_components/simpleButton.vue'
import { currentTabIndex } from '@/stores/ui'

function set_show(val) {
  showModal.value = val
}

function goToCart() {
  currentTabIndex.value = 2
  showModal.value = false
}
</script>

<template>
  <Dialog :open="showModal" @close="set_show(false)">
    <div class="modal modal-open">
      <DialogPanel class="modal-box">
        <DialogTitle class="text-center mb-3 font-bold font- text-lg">Cart</DialogTitle>
        <DialogDescription class="flex flex-col">
          <CartView class="self-center"></CartView>
          <SimpleButton
            button-title="Pay Now!"
            bg-color="btn btn-primary self-center"
            @click-extra="goToCart"
          ></SimpleButton>
        </DialogDescription>
      </DialogPanel>
    </div>
  </Dialog>
</template>
