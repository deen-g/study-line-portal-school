<template>
  <div>
    <div class="git text-teal text-uppercase" style="margin-bottom: 20px">
      <b class="bg-blue-3 q-pa-sm boarders">
        {{ ' study-line ' + git.app + ' : ' + git.branch }}
      </b>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from "vue-router/dist/vue-router"
import { rest } from "boot/axios"
import apis from "src/constants/apis"
import { useAuthStore } from "stores/auth"
import { bus } from "boot/global-event-bus"

export default defineComponent({
  name :'App',
  setup :() => {
    const auth = useAuthStore()
    const git = ref(process.env.git)
    const router = useRouter()
    onMounted(() => {
      console.log(git.value)
      console.log(process.env.APP_URL)
      loadApplication()
    })
    const loadApplication = async () => {
      let schoolToken = window.localStorage.getItem(process.env.schoolToken)
      if(!schoolToken || schoolToken === "undefined")  return await router.push({name :'school-access'})
      let request = await rest.get(apis.public.school.get + '/' + schoolToken)
      if(!request.status) return await router.push({name :'school-access'})
      auth.setSchool(request.data)
      let accessToken = window.localStorage.getItem(process.env.auth)
      if(!accessToken || accessToken === "undefined") return await router.push({name :'sign-in'})
      request = await rest.get(apis.public.school.account.access)
      if(!request.status)  return await router.push({name :'sign-in'})
      await auth.setAuthUser(request.data)
      bus.$emit('auth:is_logged_in', auth.isLoggedIn)
      await router.push({name :'dashboard-page'})
      console.log('app')
    }
    return {git}
  }
})
</script>
<style>
.git {
  /*width: 100%;*/
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: 3000;
  color: black;
  font-size: 10px;
  text-align: center;
}

.boarders {
  border-style: solid;
}
</style>
