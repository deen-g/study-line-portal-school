<template>
  <q-page padding>
    <!-- content -->
    <q-card bordered>
      <q-bar class="bg-teal text-white">
        <div class="cursor-pointer non-selectable">
          Navigation
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Simulate...</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="alert = true">New</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable>
                <q-item-section>Pages</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right"/>
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-list dense>
                    <q-item
                      v-for="n in 3"
                      :key="n"
                      clickable
                    >
                      <q-item-section>Submenu Label</q-item-section>
                      <q-item-section side>
                        <q-icon name="keyboard_arrow_right"/>
                      </q-item-section>
                      <q-menu auto-close anchor="top end" self="top start">
                        <q-list dense>
                          <q-item
                            v-for="n in 3"
                            :key="n"
                            clickable
                          >
                            <q-item-section>3rd level Label</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-item>
                  </q-list>
                </q-menu>

              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup>
                <q-item-section>Save</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <q-space/>
        <q-btn @click="alert = true" dense flat icon="add"/>
      </q-bar>
      <q-card-section class="no-padding no-margin" style="height: 150px">
        background
      </q-card-section>
      <q-separator/>
      <q-card-section class="no-padding no-margin">
        <div class="row">
          <div class="col-3 q-pt-lg">
            <q-card flat class="no-padding no-margin full-height">
              <q-card-section class="no-padding ">
                <EssentialLink
                  v-for="link in list"
                  :key="link.title"
                  v-bind="link"
                  :emit="navigate"
                />
              </q-card-section>

            </q-card>
          </div>
          <q-separator vertical/>
          <div class="col-grow">
            <q-card flat class="no-padding no-margin" style="min-height: 60vh">
              <q-card-section >
                content
              </q-card-section>
            </q-card>
          </div>

        </div>
      </q-card-section>
    </q-card>
    <q-dialog  v-model="alert">
      <q-card style="max-width: 300px" class="bg-grey-5">
        <q-card-section>
          <div class="text-h6">Add Page</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-item dense class="q-pa-none">
            <q-item-section>
              <q-input standout="bg-grey-7 text-white" dense label="Page Name" v-model="input.title"/>
            </q-item-section>
          </q-item>
          <q-item dense class="q-pa-none">
            <q-item-section>
              <q-input standout="bg-grey-7 text-white" dense label="Caption" v-model="input.caption"/>
            </q-item-section>
          </q-item>
          <q-item dense class="q-pa-none">
            <q-item-section>
              <div class="q-gutter-sm text-center">
                <q-radio v-model="input.type" val="main-page" color="Teal" label="Main Page"/>
                <q-radio v-model="input.type" val="sub-page" color="Teal" label="Sub Page"/>
              </div>
            </q-item-section>
          </q-item>
          <q-item class="q-pa-none" v-if="input.type ==='sub-page'">
            <q-item-section>
              <q-select standout="bg-grey-7 text-white" dense v-model="input.sub_link_to" :options="list_options" label="Standard"/>
            </q-item-section>
          </q-item>
          <q-item class="q-pa-none">
            <q-item-section>
              <q-select standout="bg-grey-7 text-white" dense v-model="input.icon" :options="options">
                <template v-slot:selected-item="scope">
                  <q-chip
                    dense
                    @remove="scope.removeAtIndex(scope.index)"
                    :tabindex="scope.tabindex"
                    color="white"
                    text-color="secondary"
                    class="q-ma-none"
                  >
                    <q-avatar color="secondary" text-color="white" :icon="scope.opt.icon"/>
                    {{ scope.opt.label }}
                  </q-chip>
                </template>
                <template v-slot:option="scope">
                  <q-item class="text-primary" dense v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <q-icon :name="scope.opt.icon"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Create" @click="onSubmit" color="primary" v-close-popup/>
          <q-btn flat label="Dismiss" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { computed, onMounted, ref } from "vue"
import { rest } from "boot/axios"
import apis from "src/constants/apis"
import EssentialLink from 'components/PortalEssentialLink.vue'
export default {
  // name: 'PageName',
  components :{
    EssentialLink
  },
  setup(){
    const list = ref([])

    const input = ref({
      type :'main-page',
      icon :{
        label :'Home',
        value :'home',
        icon :'home'
      }
    })
    const list_options = computed(() => {
      return list.value.map(item => {
        return {
          label :item.title,
          value :item.title,
          icon :item.icon
        }
      })
    })
    onMounted(async () => {
      let request = await rest.get(apis.authorized.webpages.structure.get)
      if(request.status){
        list.value = request.data.content
      }
    })
    const onSubmit = async () => {
      let {title, caption, type, icon, sub_link_to} = input.value
      let link = title.replace(' ', '-').toLowerCase()
      link = link + '-page'
      let holder = {
        title :title,
        caption,
        icon :icon.value,
        link :link
      }
      if(type === 'sub-page'){
        list.value.forEach((item) => {
          if(item.title === sub_link_to.value){
            if(item.link)delete item.link
            if(!item.list) item.list = []
            item.list.push({...holder})
          }
        })
      } else {
        list.value.push({...holder})
      }
      let request = await rest.post(apis.authorized.webpages.structure.update, list.value)
      console.log(request)
    }

    return {
      navigate:(a)=>{
        console.log(a)
      },
      onSubmit,
      alert :ref(false),
      list,
      input,
      list_options,
      options :[
        {
          label :'Home',
          value :'home',
          icon :'home'
        },
        {
          label :'Mail',
          value :'mail',
          icon :'mail'
        },
        {
          label :'Dashboard',
          value :'dashboard',
          icon :'dashboard'
        },
        {
          label :'Link',
          value :'link',
          icon :'link'
        },
        {
          label :'Flag',
          value :'golf_course',
          icon :'golf_course'
        },
        {
          label :'Help',
          value :'help',
          icon :'help'
        },
        {
          label :'thumb up',
          value :'thumb_up',
          icon :'thumb_up'
        },
        {
          label :'create',
          value :'create',
          icon :'create'
        },
        {
          label :'favorite',
          value :'favorite_border',
          icon :'favorite_border'
        },
        {
          label :'school',
          value :'school',
          icon :'school'
        },
        {
          label :'AccountPhone',
          value :'mdi-card-account-phone',
          icon :'mdi-card-account-phone'
        },
        {
          label :'BookOpen',
          value :'mdi-book-open-blank-variant',
          icon :'mdi-book-open-blank-variant'
        },
        {
          label :'globe',
          value :'mdi-wan',
          icon :'mdi-wan'
        },
        {
          label :'ArrowRight',
          value :'mdi-arrow-right',
          icon :'mdi-arrow-right'
        },
        {
          label :'Oracle',
          value :'ora',
          icon :'casino'
        }
      ]
    }
  }
}
</script>
