<template>
  <div class="full-width">
    <q-uploader
      label="Upload"
      class="full-width"
      :factory="factoryFn"
      :field-name="(file) => 'background' + file.name"
      :form-fields="formfields"
      :multiple="multiple"
      :no-thumbnails="!thumb"
      @uploaded="uploadedFu"
    />
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  props :['url', 'formfields', 'thumbnails', 'multi', 'callback'],

  // name: 'ComponentName',
  setup(props){
    const thumb = ref(false)
    if(props.thumbnails){
      thumb.value = true
    }
    const multiple = ref(false)
    if(props.multi){
      multiple.value = true
    }
    let headers = [{name :'x-portal', value :process.env.portal}]
    let token = localStorage.getItem(process.env.auth)
    if(token){
      headers.push({name :'x-school-authorization-token', value :token})
    }
    let school = localStorage.getItem(process.env.schoolToken)
    if(school){
      headers.push({name :'x-school-token', value :school})
    }
    const uploadedFu = (result) => {
      console.log(result)
      if(props.callback){
        props.callback(result)
      }
      // obg.reset()
    }
    const factoryFn = (files) => {
      // returning a Promise
      return new Promise((resolve) => {
        // simulating a delay of 2 seconds
        resolve({
          url :props.url,
          headers :headers
        })
      })
    }
    return {factoryFn, uploadedFu, thumb, multiple}
  }
}
</script>
