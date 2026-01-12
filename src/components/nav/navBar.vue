<script setup>
import { ref } from 'vue'
import simpleButton from '../general_components/simpleButton.vue'
import simpleModal from '../general_components/simpleModal.vue'
import hamburgerMenu from './hamburgerMenu.vue'
import changePfp from '../agent/changePfp.vue'

const showModal = ref(false)

defineProps({
  sessionData: {
    type: Array,
    default: {
      id: 0,
    },
  },
})

function toggleModal() {
  if (!showModal.value) {
    showModal.value = true
  } else if (showModal.value) {
    showModal.value = false
  }
}
</script>

<template>
  <div
    class="fixed flex w-full h-[4em] items-center shadow-md mb-10 z-10 backdrop-blur-2xl bg-base-200/50"
  >
    <div class="flex-1 justify-start p-3 hidden md:flex"></div>

    <!-- Home & About -->
    <div class="flex-1 justify-center hidden md:flex">
      <simpleButton
        button-title="Home"
        bg-color="text-2xl font-bold m-3 transition text-shadow-lg"
        :use-default="false"
        hover="ease-in-out hover:-translate-y-1 hover:scale-110"
        button-route="/"
      />
      <simpleButton
        button-title="Shop"
        bg-color="text-2xl font-bold m-3 transition text-shadow-lg"
        :use-default="false"
        hover="ease-in-out hover:-translate-y-1 hover:scale-110"
        button-route="/shop"
      />
    </div>

    <div class="flex-1 justify-end flex mx-5 md:hidden">
      <hamburgerMenu
        :is-admin="Boolean(sessionData.role === 'admin')"
        :is-logged-in="Boolean(sessionData.id)"
      ></hamburgerMenu>
    </div>

    <!-- Login & Register -->
    <div class="flex-1 justify-end p-3 ml-auto hidden md:flex">
      <div v-if="!sessionData.id">
        <simpleButton
          button-title="Login"
          hover="hover:underline decoration-2"
          button-route="/login"
        />
        <simpleButton
          button-title="Register"
          button-route="/register"
          bg-color="btn btn-primary shadow-md"
        />
      </div>
      <div v-else>
        <simpleButton
          v-if="sessionData.role === 'admin'"
          button-title="Admin"
          button-route="/admin"
          bg-color="btn btn-primary shadow-md"
        ></simpleButton>
        <simpleButton
          button-title="Logout"
          button-route="/logout"
          bg-color="btn btn-primary shadow-md"
        />
        <button
          v-if="sessionData.role !== 'user'"
          class="btn bg-base-300 mx-3 border-0 rounded-full p-0 w-10 h-10 items-center"
          @click="toggleModal"
        >
          <img
            v-if="sessionData.pfp"
            :src="sessionData.pfp"
            class="w-10 h-10 rounded-full object-cover"
          />
        </button>
      </div>
    </div>

    <simpleModal
      :show-modal="showModal"
      @close-modal="toggleModal"
      :use_extra_components="true"
      :extra_component="[
        {
          component: changePfp,
          props: { pfpDisplay: sessionData.pfp, onChangePfp: toggleModal },
        },
      ]"
    ></simpleModal>
  </div>
</template>
