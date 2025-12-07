<script setup>
import { RouterLink } from 'vue-router'
import { computed, ref, defineEmits } from 'vue'
import api from '@/api'
import { showModal } from '@/helpers'

const emits = defineEmits(['clickExtra'])

const props = defineProps({
  buttonTitle: String,
  buttonRoute: String,
  bgColor: String,
  hover: String,

  code: String,
  routeToRun: {
    type: String,
    default: '',
  },
  extraData: Object,
  useDefault: {
    type: Boolean,
    default: true,
  },
  disableBTN: {
    type: Boolean,
    default: false,
  },
})

console.log('DISABLED: ', props.disableBTN)

const loading = ref(false)
const added = ref(false)

const buttonAttrs = computed(() => {
  if (props.disableBTN) return { disabled: true }

  if (!props.code) return {} // RouterLink gets no disabled state
  return { disabled: loading.value || added.value || props.disableBTN }
})

async function handleClick() {
  if (!props.code) {
    emits('clickExtra', props.extraData)
    return
  }

  loading.value = true
  try {
    const response = (await api.post(props.routeToRun, { code: props.code })).data
    added.value = true
    console.log(response)
    showModal.value = true
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <component
    :is="props.buttonRoute ? RouterLink : 'button'"
    :to="props.buttonRoute"
    @click="handleClick"
    :class="
      props.useDefault
        ? [
            props.bgColor,
            props.hover,
            'py-2 px-4 text-lg rounded-md cursor-pointer transition m-1 btn',
          ]
        : [props.bgColor, props.hover]
    "
    v-bind="buttonAttrs"
  >
    {{ loading ? 'Processing...' : props.buttonTitle }}
  </component>

  <!-- <router-link >{{ buttonTitle }}</router-link> -->
  <!-- <button ">
        
    </button> -->
</template>
