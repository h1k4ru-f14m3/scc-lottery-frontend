<script setup>
import { Dialog, DialogDescription, DialogTitle, DialogPanel } from '@headlessui/vue'
import { compile } from 'vue'

const props = defineProps({
  modalTitle: String,
  modalDescription: String,
  showModal: {
    type: Boolean,
    default: false,
  },
  img_view: {
    type: Boolean,
    default: false,
  },
  img_src: String,
  use_extra_components: {
    type: Boolean,
    default: false,
  },
  extra_component: {
    type: Array,
    default: () => [
      {
        component: Object,
        props: () => {},
        key: String,

        have_data: {
          type: Boolean,
          default: false,
        },
        dataList: [],
      }
    ]
  },
})

const emits = defineEmits(['closeModal'])

function set_show(val) {
  emits('closeModal', val)
}

</script>

<template>
  <Dialog :open="props.showModal" @close="set_show(false)">
    <div class="modal modal-open">
      <DialogPanel class="modal-box">
        <DialogTitle v-if="props.modalTitle" class="text-center mb-3 font-bold font- text-lg">{{
          props.modalTitle
        }}</DialogTitle>

        <DialogDescription v-if="props.use_extra_components" class="flex flex-col">
            <component 
            v-for="(extra, idx) in props.extra_component" 
            :is="extra.component" 
            v-bind="{...extra.props,...(extra.key && extra.dataList && extra.dataList[idx] ? { [extra.key]: extra.dataList[idx] } : {})}" 
            v-on="extra.props"
            :key="idx"
            />
        </DialogDescription>

        <DialogDescription class="flex flex-col" v-else>
            <p v-if="props.modalDescription">{{ props.modalDescription }}</p>
            <div v-if="props.img_src">
              <img v-if="props.img_view" :src="props.img_src" alt="This is..."></img>
            </div>
            <div v-else>
              <p>Loading...</p>
            </div>
            
        </DialogDescription>
      </DialogPanel>
    </div>
  </Dialog>
</template>
