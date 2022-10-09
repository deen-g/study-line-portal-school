<template>
  <q-item class="q-ma-sm">
    <q-item-section top thumbnail class="q-ml-none">
      <img :src="url">
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ document.name }}</q-item-label>
      <q-item-label caption>
        <q-item-label>{{ document.meta.type }} for {{ document.meta.name }}</q-item-label>
        <q-item-label lines="1">
          <q-btn-group @click="copy(url)" style="max-width: 200px">
            <q-btn size="sm" no-caps class="overflow-hidden" :label="url"/>...
            <q-btn size="sm" icon="mdi-content-copy" />
          </q-btn-group>
        </q-item-label>
      </q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption>{{ document.mimetype }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-separator inset/>
</template>

<script>
import { copyToClipboard } from 'quasar'

export default {
  props :['document'],
  // name: 'ComponentName',
  setup(props){
    let url = process.env.uri + '/' + props.document.url
    const copy = (text) => {
      copyToClipboard(text)
        .then(() => {
          console.log('success')
          // success!
        })
        .catch(() => {
          console.log('fail')
          // fail
        })
    }
    return {
      url,
      copy
    }
  }
}
</script>
