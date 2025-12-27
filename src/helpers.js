import api from './api'
import router from './router'
import { ref } from 'vue'

export const showModal = ref(false)
export const currentTabIndex = ref(0)

export default async function authFormSubmit(data, response, route, backhome = true) {
  //   console.log('Received from children... \n' + JSON.stringify(data, null, 2) + '\n')

  let sendable = true
  for (const key in data) {
    if (data[key] === '' || (key === 'password' && JSON.stringify(data[key]).length < 8)) {
      sendable = false
    }
  }

  //   console.log(sendable)

  if (!sendable) {
    response.value = 'Fill all the required fields!'

    setTimeout(() => {
      response.value = null
    }, 2000)
  }

  if ('confirm_password' in data && data.password !== data.confirm_password) {
    response.value = 'Password & Confirm Password must be the same!'
    setTimeout(() => {
      response.value = null
    }, 2000)
    return
  }

  //   console.log(sendable)
  formSubmit(data, response, route, false, backhome)

  await getData('/', root_response)

  // let res = await api.post(route, data)
  // const resultData = res.data
  // if (resultData.success) {
  //   router.push('/')
  // } else {
  //   response.value = resultData.message
  //   setTimeout(() => {
  //     response.value = null
  //   }, 2000)
  // }
}

export async function formSubmit(data, response, route, changeIndex = false, back_home = true) {
  let res = await api.post(route, data)
  const resultData = res.data

  console.log('Response Data: ', resultData)

  if (resultData.success) {
    if (changeIndex) {
      return 1
    }
    if (back_home) {
      router.push('/shop')
    } else {
      if (response) {
        response.value = resultData.success
      }
    }
  } else {
    if (response) {
      response.value = resultData.message
    }
    setTimeout(() => {
      response.value = null
    }, 2000)
  }

  return resultData
}

export async function getData(route, response = null, offset = 0, q = null, search_for = null) {
  const res = await api.get(route, { params: { offset: offset, q: q, type: search_for } })
  if (response) {
    response.value = res.data
    console.log(response.value)
  }

  return res
}

export async function search(route, query, offset = 0, response = null) {
  const res = await api.get(route, { params: { q: query, offset: offset } })
  if (response) {
    response.value = res.data
  }

  // console.log('This is response from search function: ', response.value)

  return res
}

export async function logout() {
  await api.get('/logout')
  router.push('/')
}
