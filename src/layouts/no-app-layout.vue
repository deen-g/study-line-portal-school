<template>
  <q-layout  class="my-card text-white"
             style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header elevated>
      <q-bar class="q-electron-drag">
        <q-icon name="laptop_chromebook" />
        <div class="text-center" style="font-size: 13px">
        <span><u style="color: #21BA45; font-size: 13px">Study</u><span
          style="color: #cce1f6; font-size: 13px">Line</span></span>
          v{{ $q.version }}
        </div>

        <q-space />

        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
        <q-btn dense flat icon="mdi-fullscreen" @click="toggleFullscreen" />
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>
    </q-header>
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
// import { ref } from 'vue'

export default {
  // name: 'LayoutName',

  setup () {
    function minimize () {
      if (process.env.MODE === 'electron') {
        console.log(window.winAPI)
        window.winAPI.minimize()
      }
    }

    function toggleMaximize () {
      if (process.env.MODE === 'electron') {
        window.winAPI.toggleMaximize()
      }
    }

    function toggleFullscreen () {
      if (process.env.MODE === 'electron') {
        window.winAPI.toggleFullscreen()
      }
    }
    function closeApp () {
      if (process.env.MODE === 'electron') {
        window.winAPI.close()
      }
    }

    return { minimize, toggleMaximize,toggleFullscreen, closeApp }
  }
}
</script>
