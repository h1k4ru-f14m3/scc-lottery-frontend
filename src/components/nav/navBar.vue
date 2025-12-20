<script setup>
import simpleButton from '../general_components/simpleButton.vue'
import hamburgerMenu from './hamburgerMenu.vue'

defineProps({
  sessionData: {
    type: Array,
    default: {
      id: 0,
    },
  },
})
</script>

<template>
  <div class="fixed flex w-full h-[4em] items-center backdrop-blur-lg shadow-md mb-10 z-10">
    <div class="flex-1 justify-start p-3 hidden md:flex"></div>

    <!-- Home & About -->
    <div class="flex-1 justify-center hidden md:flex">
      <simpleButton
        button-title="Home"
        hover="ease-in-out hover:-translate-y-1 hover:scale-110"
        button-route="/"
      />
      <simpleButton
        button-title="Shop"
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
      </div>
    </div>
  </div>
</template>
