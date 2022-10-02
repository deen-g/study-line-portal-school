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

export default defineComponent({
  name :'App',
  setup :() => {
    const git = ref(process.env.git)
    const router = useRouter()
    onMounted(() => {
      console.log(git.value)
      console.log(process.env.APP_URL)
      loadApplication()
    })
    const loadApplication = async () => {
      let schoolToken = window.localStorage.getItem(process.env.schoolToken)
      if(schoolToken){
        await router.push({name :'sign-in'})
        console.log('app')
      } else {
        console.log('school-access')
        await router.push({name :'school-access'})
      }
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
