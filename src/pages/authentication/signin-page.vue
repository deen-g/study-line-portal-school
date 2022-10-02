<template>
  <q-page padding>
    <!-- content -->
    <div class="fit row wrap justify-center items-start content-start">
      <div class="col-lg-3 col-md-5 col-sm-8 col-xs-12 self-center" style="padding-top: 135px;">
        <q-card flat class="text-center text-uppercase text-primary">
          <q-card-section>
            <div>
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
                type="email"
                v-model="input.email"
                dense
                label="Your email *"
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
      let schoolToken = window.localStorage.getItem(process.env.schoolToken)
      let request = await rest.get(apis.public.school.get + '/' + schoolToken)
      if(!request.status){
        await router.push({name :'school-access'})
      }
      auth.setSchool(request.data)
      school.value = request.data
      console.log(school.value)
    })
    const id_loading = ref(false)
    const input = ref({
      email :'deen2@mailinator.com',
      password :'123456789'
    })

    const login = async () => {
      // debugger
      id_loading.value = true
      const login = await rest.post(apis.authentication.school.login, {...input.value})
      console.log(login)
      id_loading.value = false
      if(login.status){
        let {data} = login
        auth.setAuthUser(data)
        window.localStorage.setItem(process.env.auth, data.accessToken)
        await router.push({name :'dashboard-page'})
      }
    }

    const onSubmit = async () => {
      if(!input.value.email || input.value.email.length < 1){
        return notifications.negative('please set your email')
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
