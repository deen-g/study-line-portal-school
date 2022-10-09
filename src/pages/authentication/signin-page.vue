<template>
  <q-page padding>
    <!-- content -->
    <div class="fit row wrap justify-center items-start content-start">
      <div class="col-lg-3 col-md-5 col-sm-8 col-xs-12 self-center" style="padding-top: 135px;">
        <q-card flat class="text-center text-primary">
          <q-card-section>
            <div class="text-uppercase">
              {{school.name}}<br/>
              {{school.code}}<br/>
              {{school.address}}
            </div>
            <br/>
            <span class="text-uppercase">Login</span>
          </q-card-section>
          <q-separator inset/>
          <q-card-section>
            <q-form
              @submit="onSubmit"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="input.username"
                dense
                label="Your username *"
              />
              <q-input
                filled
                type="password"
                v-model="input.password"
                dense
                label="Your password *"
              />

              <div>
                <q-btn size="sm" class="full-width" :loading="id_loading" label="Submit" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { notifications } from 'boot/notification'
import { useRouter } from 'vue-router/dist/vue-router'
import { bus } from 'boot/global-event-bus'
import { useAuthStore } from "stores/auth"
import { rest } from "boot/axios"
import apis from "src/constants/apis"

export default {
  // name: 'PageName',
  setup :() => {
    const auth = useAuthStore()
    const router = useRouter()
    const school = ref({})
    onMounted(async () => {
      if(!auth.hasSchool)  await router.push({name :'school-access'})
      school.value = auth.getSchool
      console.log(school.value)
    })
    const id_loading = ref(false)
    const input = ref({
      username :'SLMAA1.001',
      password :'123456789'
    })

    const login = async () => {
      // debugger
      id_loading.value = true
      const login = await rest.post(apis.public.school.login, {...input.value})
      console.log(login)
      id_loading.value = false
      if(login.status){
        let {data} = login
        auth.setAuthUser(data)
        window.localStorage.setItem(process.env.auth, data.public_access_token)
        await router.push({name :'dashboard-page'})
      }
    }

    const onSubmit = async () => {
      if(!input.value.username || input.value.username.length < 1){
        return notifications.negative('please set your username')
      }
      if(!input.value.password || input.value.password.length < 1){
        return notifications.negative('please set your password')
      }
      await login()
      bus.$emit('auth:is_logged_in', auth.isLoggedIn)
    }
    return {
      input,
      id_loading,
      school,
      onSubmit
    }
  }
}
</script>
