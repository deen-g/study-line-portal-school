<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-grey-2 text-primary">
      <q-bar class="q-electron-drag bg-primary text-white">
        <q-icon name="laptop_chromebook"/>
        <div class="text-center" style="font-size: 13px">
        <span><u style="color: #21BA45; font-size: 13px">Study</u><span
          style="color: #cce1f6; font-size: 13px">Line</span></span>
          v{{ $q.version }}
        </div>

        <q-space/>

        <q-btn dense flat icon="minimize" @click="minimize"/>
        <q-btn dense flat icon="crop_square" @click="toggleMaximize"/>
        <q-btn dense flat icon="mdi-fullscreen" @click="toggleFullscreen"/>
        <q-btn dense flat icon="close" @click="closeApp"/>
      </q-bar>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
         <span style="cursor: pointer;" @click="$router.push({name:'index'})" class="text-capitalize">
           {{school.name}}
         </span>
        </q-toolbar-title>
        <div class="gt-sm">
          <search-menu-comp :borderless="false"/>
        </div>
        <q-separator spaced vertical inset/>
        <q-btn
          flat
          dense
          round
          icon="mdi-bell-circle-outline"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-separator spaced vertical inset/>
        <q-btn
          flat
          dense
          @click="login"
        >
          <q-chip size="sm" :color="isLoggedIn?'teal':'red'" text-color="white">
            <q-avatar size="sm" color="white">
              <img v-if="isLoggedIn && account.avatar" :src="account.avatar">
              <img v-else src="~assets/user.png">
            </q-avatar>
            {{ isLoggedIn ? account.acronym : 'login' }}
          </q-chip>
        </q-btn>
      </q-toolbar>
      <div class="lt-sm full-width">
        <q-separator/>
        <search-menu-comp :borderless="true"/>
      </div>
    </q-header>
    <q-footer class="bg-grey-2 text-primary">
      <div class="text-center" style="font-size: 13px">
        <span><u style="color: #21BA45; font-size: 13px">Study</u><span
          style="color: #1976D2; font-size: 13px">Line</span></span>
        v{{ $q.version }}
      </div>
    </q-footer>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="left"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-separator inset spaced/>
        <q-list>
          <q-item-label class="text-uppercase"
                        header overline
          >
            {{ page }}

          </q-item-label>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
          <q-btn
            v-if="isLoggedIn"
            color="negative"
            size="sm"
            icon-right="mdi-logout"
            class="full-width absolute-bottom"
            @click="logout"
            label="logout"/>
        </q-list>
      </q-scroll-area>
      <panel-profile-comp/>
    </q-drawer>
    <q-drawer
      v-model="rightDrawerOpen"
      show-if-above
      bordered
      side="right"
    >
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router/dist/vue-router'
import SearchMenuComp from 'components/search-menu-comp.vue'
import navigations from 'src/constants/navigations'
import PanelProfileComp from 'components/panels/panel-profile-comp.vue'
import { bus } from 'boot/global-event-bus'
import { useAuthStore } from "stores/auth"
import apis from "src/constants/apis"
import { rest } from "boot/axios"
import { notifications } from "boot/notification"

export default defineComponent({
  name :'AuthLayout',

  components :{
    PanelProfileComp,
    SearchMenuComp,
    EssentialLink
  },

  setup(){
    const auth = useAuthStore()
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const page = ref('dashboard')
    const list = ref([])
    // eslint-disable-next-line no-unused-vars
    const router = useRouter()
    let isLoggedIn = computed(() => {
      return auth.isLoggedIn
    })
    let account = computed(() => {
      return auth.getAccount
    })
    let school = computed(() => {
      return auth.getSchool
    })
    const login = async () => {
      if(isLoggedIn.value){
        console.log('isLoggedIn')
        // toggleRightDrawer()
      } else {
        console.log('login')
        await router.push({name :'sign-in'})
      }
    }
    const closeDrawer = () => {
      leftDrawerOpen.value = false
    }
    const logout = async () => {
      const user = auth.getAccount
      const logout = await rest.get(apis.authorized.logout + `?id=${user._id}`)
      if(logout.status){
        window.localStorage.removeItem(process.env.auth)
        notifications.positive('you are logged out')
        await auth.clearAuthUser()
        await router.push({name :'sign-in'})
      }
    }
    const loadWebUrl = async () => {
      let listing = [{
        hr :true
      },
        {
          title :'Home',
          icon :'home',
          link :'index-page',
          query :{page :'home-page'},
          authorized :['web']
        },
        {
          title :'About Us',
          caption :'Little but on study line',
          icon :'mdi-help-network',
          link :'index-page',
          query :{page :'about-page'},
          authorized :['web']
        },
        {
          title :'Services',
          caption :'Our services and features',
          icon :'mdi-face-agent',
          link :'index-page',
          query :{page :'services-page'},
          authorized :['web']
        },
        {
          title :'Contact Us',
          caption :'Get connected in real time',
          icon :'mdi-card-account-phone',
          link :'index-page',
          query :{page :'contact-us-page'},
          authorized :['web']
        }]
      let request = await rest.get(apis.authorized.webpages.structure.get)
      console.log(request)
      if(request.status){
        listing = request.data.content
        // return request.data
      }

      return listing
    }
    onMounted(async () => {

      bus.$on('auth:is_logged_in', async () => {
        let listing = await loadWebUrl()
        list.value = await navigations.links(listing)
        console.log('logii')
      })
    })
    onUnmounted(() => {
      bus.$off('auth:is_logged_in', () => {
      })
    })

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }

    function minimize(){
      if(process.env.MODE === 'electron'){
        console.log(window.winAPI)
        window.winAPI.minimize()
      }
    }

    function toggleMaximize(){
      if(process.env.MODE === 'electron'){
        window.winAPI.toggleMaximize()
      }
    }

    function toggleFullscreen(){
      if(process.env.MODE === 'electron'){
        window.winAPI.toggleFullscreen()
      }
    }

    function closeApp(){
      if(process.env.MODE === 'electron'){
        window.winAPI.close()
      }
    }

    return {
      page,
      essentialLinks :list,
      leftDrawerOpen,
      toggleLeftDrawer,
      rightDrawerOpen,
      toggleRightDrawer,
      isLoggedIn,
      account,
      school,
      logout,
      login,
      closeDrawer, minimize, toggleMaximize, toggleFullscreen, closeApp
    }
  }
})
</script>
