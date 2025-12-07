<script setup>
import simpleButton from './general_components/simpleButton.vue'
import { ref } from 'vue'

const props = defineProps({
  extraClasses: String,
  theads: {
    type: Array,
    default: ['No.', 'Ticket Code', 'Action'],
  },
  tickets_string: String,
})

const tickets = ref([])
tickets.value = String(props.tickets_string).split(';')
</script>

<template>
  <table class="table border-2 border-base-200 rounded-md" :class="props.extraClasses">
    <thead>
      <tr>
        <th v-for="header in props.theads">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tickets">
        <td>{{ index + 1 }}</td>
        <td>{{ String(item).padStart(5, '0') }}</td>
        <td>
          <simpleButton
            bg-color="btn btn-warning shadow-md h-[1.5em] m-0"
            button-title="Remove"
            route-to-run="/cart/remove"
            :code="item"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
