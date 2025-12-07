<script setup>
import navBar from './components/nav/navBar.vue'
import { user_session } from './stores/tempSessions'

// getData(user_session, '/')
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
