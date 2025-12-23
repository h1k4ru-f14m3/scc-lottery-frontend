<script setup>
import simpleButton from '../general_components/simpleButton.vue'
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'

const props = defineProps({
    isAdmin: {
        type: Boolean,
        default: false,
    },

    isLoggedIn: {
        type: Boolean,
        default: false
    }
})

const menuOpen = ref(false)
function toggleMenu() {
  if (menuOpen.value) {
    menuOpen.value = false
  } else if (!menuOpen.value) {
    menuOpen.value = true
  }
}
</script>

<template>
    <div>
        <img v-if="!menuOpen" src="/src/assets/icons/menu.svg" alt="Menu Button" class="w-8 h-8" @click="toggleMenu"></img>
        <img v-else-if="menuOpen" src="/src/assets/icons/x.svg" alt="Menu Button" class="w-8 h-8" @click="toggleMenu"></img>
    </div>

  <Dialog :open="menuOpen" @close="toggleMenu">
    <DialogPanel>
        <div class="menu bg-base-200 rounded-lg fixed top-15 left-0 w-full transition shadow-md z-100">
            <simpleButton @click-extra="toggleMenu"
                :use-default="false" button-title="Home" bg-color="w-full text-center text-lg py-1 px-3 rounded-md transition" hover="hover:bg-base-100 focus:outline-none"     button-route="/"
            />
            <simpleButton @click-extra="toggleMenu"
                :use-default="false" button-title="Shop" bg-color="w-full text-center text-lg py-1 px-3 rounded-md transition" hover="hover:bg-base-100 focus:outline-none" button-route="/shop" 
            />

            <div class="flex flex-col mt-5 justify-center items-center">
                <div v-if="!props.isLoggedIn">
                    <simpleButton @click-extra="toggleMenu" bg-color="w-full" button-title="Login" button-route="/login" hover="hover:underline decoration-2"></simpleButton>
                    <simpleButton @click-extra="toggleMenu" bg-color="w-full btn-primary" button-title="Register" button-route="/register" hover="hover:underline decoration-2"></simpleButton>
                </div>
                <div v-else class="flex flex-col mt-5 justify-center items-center">
                    <simpleButton
                    v-if="props.isAdmin" @click-extra="toggleMenu" 
                    button-title="Admin"
                    button-route="/admin"
                    bg-color="btn btn-primary shadow-md"
                    ></simpleButton>
                    <simpleButton @click-extra="toggleMenu" bg-color="w-full btn-primary shadow-md" button-title="Logout" button-route="/logout" hover="hover:underline decoration-2"></simpleButton>
                    
                </div>
            </div>
        </div>
    </DialogPanel>
  </Dialog>

  <!-- <div>
        <img v-if="!menuOpen" src="/src/assets/icons/menu.svg" alt="Menu Button" class="w-8 h-8" @click="toggleMenu"></img>
        <img v-else-if="menuOpen" src="/src/assets/icons/x.svg" alt="Menu Button" class="w-8 h-8" @click="toggleMenu"></img>
    </div>

    <div v-if="menuOpen" class="menu bg-base-300 rounded-lg w-full fixed z-10">
        <simpleButton
            :use-default="false"
            button-title="Home"
            bg-color="text-lg py-1 px-3 rounded-md transition"
            hover="hover:bg-base-200"                 button-route="/"
        />
        <simpleButton
            :use-default="false"
            button-title="About"
            bg-color="text-lg py-1 px-3 rounded-md transition"
            hover="hover:bg-base-200"
            button-route="/about"
        />
    </div> -->
  <!-- <Menu>
    <MenuButton>
      <img v-if="!menuOpen" src="/src/assets/icons/menu.svg" alt="Menu Button" class="w-8 h-8" @click="toggleMenu"></img>
      <img v-else-if="menuOpen" src="/src/assets/icons/x.svg" alt="Menu Button" class="w-8 h-8" @click="toggleMenu"></img>
    </MenuButton>
    <MenuItems>
        <div class="menu bg-base-300 rounded-lg">
            <MenuItem>
            <simpleButton
                :use-default="false"
                button-title="Home"
                bg-color="text-lg py-1 px-3 rounded-md transition"
                hover="hover:bg-base-200"
                button-route="/"
            />
            </MenuItem>
            <MenuItem>
            <simpleButton
                :use-default="false"
                button-title="About"
                bg-color="text-lg py-1 px-3 rounded-md transition"
                hover="hover:bg-base-200"
                button-route="/about"
            />
            </MenuItem>
        </div>
    </MenuItems>
  </Menu> -->
</template>
