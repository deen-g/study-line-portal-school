<template>
  <div>
    <q-img class="absolute-top" src="~assets/images.png" style="height: 150px">
      <template v-if="isLoggedIn">
<span>
<q-list>
  <q-item>
  <q-item-section side>
    <q-avatar rounded>
      <img src="https://cdn.quasar.dev/img/avatar.png">
    </q-avatar>
  </q-item-section>
  <q-item-section>
    <q-item-label caption>{{ account.name }}</q-item-label>
    <q-item-label caption>{{ account.email }}</q-item-label>
  </q-item-section>
</q-item>
  <q-separator inset/>
  <q-item>
    <q-item-section>
      <q-item-label overline>{{ account.is_super_admin ? 'MANAGER' : 'STUDENT' }} STATUS</q-item-label>
      <q-item-label caption>APPLICATIONS: 0</q-item-label>
      <q-item-label caption>SL-USER SINCE : {{ account.createdAt }}</q-item-label>
    </q-item-section>
  </q-item>
</q-list>
</span>
      </template>
      <template v-else>
        <span class="text-center absolute-center"/>
      </template>
    </q-img>
  </div>
</template>

<script>
import { useAuthStore } from "stores/auth"
import { computed } from 'vue'

export default {
  // name: 'ComponentName',
  setup(){
    const auth = useAuthStore()
    let isLoggedIn = computed(() => {
      return auth.isLoggedIn
    })
    let account = computed(() => {
      return auth.getAccount
    })
    return {isLoggedIn, account}
  }
}
</script>
