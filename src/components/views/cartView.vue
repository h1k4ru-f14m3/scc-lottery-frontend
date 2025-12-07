<script setup>
import { getData } from '@/helpers'
import { ref, watch, computed, onMounted } from 'vue'
import simpleButton from '../general_components/simpleButton.vue'

const emits = defineEmits(['show'])

const response = ref()
onMounted(async () => {
  await getData('/cart', response)
})

const tickets_bought = ref([])
const price_each = ref(0)
const total = ref(0)
watch(response, (newVal) => {
  price_each.value = Number(newVal.data.price_each)
  if (!newVal.data.tickets_bought) {
    return
  }

  tickets_bought.value = newVal.data.tickets_bought.split(';')

  total.value = tickets_bought.value.length * price_each.value
})

const show_table = computed(() => tickets_bought.value.length > 0)
onMounted(() => emits('show', show_table))
// console.log('To Emit: ', show_table.value)
</script>

<template>
  <div class="flex justify-center flex-col" v-show="show_table">
    <table class="self-center table border-2 border-base-200 rounded-md">
      <thead>
        <tr>
          <th></th>
          <th>Ticket Code</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ticket, index) in tickets_bought">
          <th>{{ index + 1 }}</th>
          <td>{{ String(ticket).padStart(5, '0') }}</td>
          <td>{{ Number(price_each).toLocaleString() }}</td>
          <td>
            <simple-button
              bg-color="btn btn-warning shadow-md h-[1.5em] m-0"
              button-title="Remove"
              route-to-run="/cart/remove"
              :code="ticket"
            />
          </td>
        </tr>
        <tr>
          <th></th>
          <th>Total:</th>
          <td>{{ Number(total).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div
    class="flex flex-col items-center p-2 border-2 border-base-200 h-[75vh]"
    v-show="!show_table"
  >
    <p>Cart is empty.</p>
    <p>Buy some tickets!</p>
  </div>

  <!-- 
  <div>
    <h1>...</h1>
    <p>{{ tickets_bought[1] }}</p>
  </div>
  <div>
    <h1>Cart Data</h1>
    <p>{{ response.data }}</p>
  </div>
  <div>
    <h1>User Session</h1>
    <p>{{ response.user }}</p>
  </div>

  <ul class="list bg-base-100 shadow-md">
    <li class="text-lg">Test!</li>

    <li class="list-row">
      <p>Tickets Bought: {{ response.data.tickets_bought }}</p>
    </li>
    <li class="list-row">
      {{ response.data.is_in_cart }}
    </li>
  </ul> -->
</template>
