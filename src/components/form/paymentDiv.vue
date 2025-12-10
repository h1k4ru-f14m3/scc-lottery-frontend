<script setup>
import { Tab, TabGroup, TabPanel, TabList, TabPanels } from '@headlessui/vue'
import simpleButton from '../general_components/simpleButton.vue';
import { defineEmits, reactive } from 'vue';
import imageCompression from 'browser-image-compression';

const props = defineProps({
    show: {
        type: Boolean,
        default: true,
    }
})

console.log('showPaymentDiv: ', props.show)

const emit = defineEmits(['confirm'])

const dataToSend = reactive({})

function handleConfirm() {
    emit('confirm', {...dataToSend})
    console.log('Data to send: ',{...dataToSend})
}

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
        dataToSend.img_link = reader.result
    }

    // reader.readAsDataURL(file)

    const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1080,
    })

    console.log('Compressed File size: ', compressedFile.size)

    reader.readAsDataURL(compressedFile)
}

</script>

<template>
    <TabGroup v-if="props.show">
        <div class="flex flex-col w-full items-center">
            <h1 class="m-5 mb-0">Payment Methods</h1>
            <TabList class="tabs tabs-box m-5 mt-3">
                <Tab class="tab focus:outline-none">KPay</Tab>
                <Tab class="tab focus:outline-none">Pay2</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <img src="/src/assets/qr_codes/qr_code_placeholder.png" alt="QRcode 1"></img>
                </TabPanel>
                <TabPanel>
                    <img src="/src/assets/qr_codes/qr_code_placeholder_2.png" alt="QRcode 2"></img>
                </TabPanel>
            </TabPanels>

            <label for="img_link" class="mt-5 mb-1">Verfication Image:</label>
            <input name="img_link" type="file" accept=".png, .jpg, .jpeg" class="file-input file-input-ghost mb-5" @change="handleImage" />
            
            <simpleButton button-title="Confirm Order" bg-color="btn btn-primary" @click="handleConfirm"></simpleButton>
        </div>
    </TabGroup>
</template>
