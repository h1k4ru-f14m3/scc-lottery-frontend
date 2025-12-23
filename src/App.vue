<script setup>
import navBar from './components/nav/navBar.vue'
import { user_session, root_response } from './stores/tempSessions'
import { getData } from './helpers'

getData('/', root_response)
</script>

<template>
  <head>
    <title>SCC Lottery</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <header class="">
    <navBar :sessionData="user_session" />
    <router-view></router-view>
  </header>
</template>
