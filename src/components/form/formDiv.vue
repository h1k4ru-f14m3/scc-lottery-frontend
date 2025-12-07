<script setup>
import { reactive, defineEmits, computed, ref } from 'vue';
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
import simpleButton from '../general_components/simpleButton.vue';
import { vAutoAnimate } from '@formkit/auto-animate';

const emit = defineEmits(['submit'])

const props = defineProps({
    title: String,
    buttonTitle: String,
    inputs: {
        type: Array,
        default: () => [
            {name: 'logininfo', label: 'Phone Number:', type: 'text'},
            {name: 'password', label: 'Password:', type:'password'}
        ],
    },
    message: ref(),
})

const formData = reactive({})

props.inputs.forEach(field => {
    formData[field.name] = ''
})

function handleSubmit() {
    emit('submit', {...formData})
}

const showMessage = computed(() => {return props.message !== null})

</script>


<template>

    <div class="flex flex-col p-8 w-[25em] bg-base-200 rounded-md justify-center items-start shadow-glow-md mx-auto" v-auto-animate>

        <h1 class="text-[3em] font-black self-center text-shadow-md mb-3">{{ title }}</h1>

        <div class="alert alert-error mb-2 self-center" v-if="showMessage">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-md font-bold">{{ message }}</span>
        </div>

        <!-- <TransitionRoot as="template" :show="showMessage" enter="transition transform duration-300 ease-out" enter-from="-translate-y-10 opacity-0" enter-to="translate-y-0 opacity-100" leave="transition transform duration-300 ease-out" leave-from="translate-y-0 opacity-100" leave-to="-translate-y-10 opacity-0">
            <div class="alert alert-error mb-2 self-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-md font-bold">{{ message }}</span>
            </div>
        </TransitionRoot> -->

        <div v-for="item in props.inputs" :key="item.name" class="flex flex-col w-full my-1">

            <label class="text-[1.2em] text-left w-full mx-5" :for="item.name">{{ item.label }}</label>

            <input class="w-[22em] h-[2.5em] p-2 shadow-md mx-auto input" :name="item.name" v-model="formData[item.name]" :type="item.type"></input>

        </div>

        <simpleButton class="mt-[2em] self-center" :button-title="buttonTitle" @click="handleSubmit" bg-color="btn-primary" />
    </div>
</template>