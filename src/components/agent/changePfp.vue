<script setup>
import { ref } from 'vue'
import { root_response } from '@/stores/tempSessions'
import { getData } from '@/helpers'
import imageCompression from 'browser-image-compression'
import api from '@/api'
import SimpleButton from '../general_components/simpleButton.vue'
import { vAutoAnimate } from '@formkit/auto-animate'

const props = defineProps({
  pfpDisplay: String,
})

const emits = defineEmits(['changePfp'])

const pfp = ref(props.pfpDisplay)

async function handleImage(event) {
  console.log('handling image...')
  const reader = new FileReader()
  const file = event.target.files[0]

  if (!file) {
    return
  }

  console.log('Original File type: ', file.type)
  console.log('Original file size: ', file.size)

  reader.onload = () => {
    pfp.value = reader.result
  }

  // reader.readAsDataURL(file)

  const compressedFile = await imageCompression(file, {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1080,
  })

  //   console.log('Compressed File size: ', compressedFile.size)

  reader.readAsDataURL(compressedFile)
}

const showMessage = ref(false)
const message = ref(null)
const messageSuccess = ref(false)
const fetching = ref(false)

async function handleSubmit() {
  fetching.value = true
  const res = await api.post('/changepfp', { pfp: pfp.value })
  const res_data = res.data

  showMessage.value = true
  message.value = res_data.message
  messageSuccess.value = res_data.success

  setTimeout(async () => {
    showMessage.value = false
    message.value = null
    messageSuccess.value = res_data.success
    if (res_data.success) {
      await getData('/', root_response)
    }
    emits('changePfp', true)
    fetching.value = false
  }, 2000)
}
</script>

<template>
  <div class="flex flex-col w-full items-center justify-center" v-auto-animate">
    <div
      class="alert mb-2 self-center"
      :class="messageSuccess ? 'alert-success' : 'alert-error'"
      v-if="showMessage"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          v-if="!messageSuccess"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="text-md font-bold">{{ message }}</span>
    </div>

    <h1 class="text-[2em] font-black self-center text-shadow-md mb-3">Change Profile</h1>
    <div class="w-[15em] h-[15em] rounded-full bg-base-300">
      <img v-if="pfp" class="w-full h-full object-cover rounded-full" :src="pfp" />
    </div>

    <input
      name="pfp"
      type="file"
      accept=".png, .jpg, .jpeg"
      class="file-input file-input-ghost m-3"
      @change="handleImage"
    />
    <SimpleButton
      button-title="Confirm"
      bg-color="btn btn-primary mt-3"
      @click="handleSubmit"
      :loading="fetching"
    ></SimpleButton>
  </div>
</template>
