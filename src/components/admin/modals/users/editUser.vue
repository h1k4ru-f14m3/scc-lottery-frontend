<script setup>
import { reactive, ref, onMounted } from 'vue'
import imageCompression from 'browser-image-compression';
import api from '@/api';
import simpleButton from '@/components/general_components/simpleButton.vue';
import { all } from 'axios';

const props = defineProps({
  id: [Number, String],
})

const emits = defineEmits(['submitEdit'])

const textData = reactive({
  name: '',
  email: '',
  phone_number: '',
  address: '',
  password: '',
})

const roleData = reactive({
    role: ''
})

const pfpData = reactive({
  pfp: '',
})

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
        pfpData.pfp = reader.result
    }

    // reader.readAsDataURL(file)

    const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1080,
    })

    console.log('Compressed File size: ', compressedFile.size)

    reader.readAsDataURL(compressedFile)
}


const user_fetch_data = ref()
const user_data = ref(null)
async function fetch_user() {
    console.log('FETCHING USER DATA!')
    const user_fetch_data = await api.post('/user/get_user', { id: props.id })
    user_data.value = user_fetch_data.data.data

    for (const key in textData) {
        console.log('KEY: ', key)
        console.log('VALUE: ', user_data.value[key])
        if (user_data.value[key] !== undefined){
            textData[key] = user_data.value[key]
        }
    }

    if (user_data.value['role'] !== undefined) {
        roleData['role'] = user_data.value.role
    }

    if (user_data.value['pfp'] !== undefined) {
        pfpData['pfp'] = user_data.value.pfp
    }

}
onMounted(() => {
    fetch_user()
})


async function handleSubmit() {
    const allData = {...textData, ...roleData, ...pfpData}
    for (const key in allData) {
        if (!allData[key]) {
            console.log('NEED TO DELETE THIS KEY: ', key)
            console.log('NEED TO DELETE THIS VALUE: ', allData[key])

            delete allData[key]
        }
    }
    console.log('ALL_DATA: ', allData)
}



</script>

<template>
  <div class="flex flex-col items-center justify-center">

    <div class="flex flex-row items-center justify-center">
        <img v-if="pfpData.pfp" :src="pfpData.pfp" class="w-12 h-12 rounded-full m-3"></img>
        <h1 class="text-[2em] font-black self-center text-shadow-md mb-3">Edit User: {{ props.id }} </h1>    
    </div>
    

    <div class="flex flex-col items-center">
        <input v-for="(item, key) in textData" v-model="textData[key]" :placeholder="String(key).charAt(0).toUpperCase()+ String(key).slice(1)" class="w-[22em] h-[2.5em] p-2 shadow-md mx-auto input m-1" :type="key === 'password' ? 'password' : 'text'"></input>
    </div>

    <div class="flex flex-row">
        <input name="pfp" type="file" accept=".png, .jpg, .jpeg" class="file-input file-input-ghost m-3" @change="handleImage" />
    </div>

    <select v-model="roleData.role" class="select focus:outline-none mb-1" name="role">
      <option disabled value="">Pick a role</option>
      <option value="admin">Admin</option>
      <option value="agent">Agent</option>
      <option value="user">User</option>
    </select>

    <simpleButton button-title="Edit User" bg-color="btn btn-primary mt-3" @click="handleSubmit"></simpleButton>
  </div>
</template>
