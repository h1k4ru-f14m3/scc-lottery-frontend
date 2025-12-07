import { ref, computed } from 'vue'

export const root_response = ref()
export const user_session = computed(() => {
  return root_response.value?.user_session
})
export const bought_data = ref()
export const cart_session = ref()
