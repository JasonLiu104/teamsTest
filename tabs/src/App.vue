<template>
  <div class="Index">
    <div
      v-if="!info||isLoading"
      class="Loading"
    >
      loading...
    </div>
    <div
      v-else
      class="Info"
    >
      <h2>用戶資訊</h2>
      <ul>
        <li>
          name:{{ info.displayName }}
        </li>
        <li>
          jobTitle:{{ info.jobTitle }}
        </li>
        <li>
          mail:{{ info.mail }}
        </li>
      </ul>
      <h2>請假專區</h2>
      <ul>
        <li>
          請假
          <button @click="sendBot">
            送出假單
          </button>
        </li>
      </ul>
      <h2>簽核通知</h2>
      <ul>
        <li
          v-for="(item,index) in list"
          :key="index"
        >
          {{ index+1 }} 來自{{ item }}的假單 
          <button @click="delMessage(index)">
            核准
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
  
<script setup>
import {
  app, authentication
} from '@microsoft/teams-js'
import {
  ref 
} from 'vue'
const isLoading = ref(false)
let info = ref('')
const token = ref('')
const list = ref([])
app.initialize().then(async () => {
  isLoading.value = true
  info.value = await app.getContext()
  await login()
  const store = localStorage.getItem('sign')
  if (store) list.value = JSON.parse(store)
  isLoading.value = false
})

async function login (){
  let { accessToken } = await authentication.authenticate({
    height: '500',
    width: '500',
    url: '/auth-start.html?scope=User.Read&clientId=7881638a-818a-41c3-94ba-0625ba5c1dfe'
  })
  info.value = await callMsGraphGetUserInfo(accessToken)
}

async function callMsGraphGetUserInfo (accessToken) {
  const headers = new Headers()
  const bearer = `Bearer ${ accessToken }`
  headers.append('Authorization', bearer)
  token.value = accessToken
  const options = {
    method: 'GET',
    headers: headers
  }
  try {
    const response = await fetch('https://graph.microsoft.com/v1.0/me', options)
    const userInfo = await response.json()
    return userInfo
  } catch (err){
    console.log(err)
  }
}

async function sendBot (){
  isLoading.value = true
  const endpoint = 'http://localhost:3978/api/notification'
  const options = {
    method: 'POST'
  }
  try {
    await fetch(endpoint, options)
    alert('送出成功')
  } catch (err){
    console.log(err)
  } finally {
    localStorage.setItem('sign', JSON.stringify([ ...list.value, ...[ info.value.displayName + new Date() ] ]))
    isLoading.value = false
  }
}

function delMessage (index){
  list.value.splice(index, 1)
  if (list.value.length){
    localStorage.setItem('sign', JSON.stringify(list.value))
  }
}

</script>
  
<style lang="scss">
@use '@/assets/styles/base.scss';

.Index {
  padding: 10px;
}

.Info {
  li {
    margin-bottom: 10px;
  }
}

.Loading {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #000;
  background-color: #ccc;
}

button {
  padding: 5px;
  background-color: #ccc;
}
  </style>