<template>
  <template v-if="!hr">
    <template v-if="list.length>0">
      <q-expansion-item
        expand-separator
        expand-icon-toggle
        dense
        :label="title"
        :caption="list.length+' option (s) in '+title"
      >
        <EssentialLink
          v-for="l in list"
          :key="l.title"
          :emit="navigate"
          v-bind="l"
        />
      </q-expansion-item>
    </template>
    <template v-else>
      <q-item
        class="text-primary"
        clickable
        dense
        @click="navigate"
      >
        <q-menu
          touch-position
          context-menu
        >

          <q-list dense style="min-width: 100px">
            <q-item class="bg-blue text-white" clickable v-close-popup>
              <q-item-section>
                <q-item-label class="bg-blue text-white text-uppercase" overline>{{ title }} page</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Save ...</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>New page in...</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Remove</q-item-section>
            </q-item>
          </q-list>

        </q-menu>
        <q-item-section
          v-if="icon"
          avatar
        >
          <q-icon size="15px" :name="icon"/>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-capitalize" style="font-size: 12px">{{ title }}</q-item-label>
          <q-item-label caption style="font-size: 10px">{{ caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </template>
  <template v-else>
    <q-separator/>
  </template>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name :'EssentialLink',
  props :{
    hr :{
      type :Boolean,
      required :false
    },
    title :{
      type :String,
      required :false
    },
    auth :{
      type :Boolean,
      required :false
    },
    caption :{
      type :String,
      default :''
    },
    level :{
      type :Number,
      default :0
    },
    link :{
      type :String,
      default :'#'
    },
    list :{
      type :Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default :[]
    },
    icon :{
      type :String,
      default :''
    },
    hasSchool :{
      type :Boolean,
      default :false
    },
    query :{
      type :Object,
      default :null
    },
    params :{
      type :Object,
      default :null
    },
    emit :{
      type :Function
    }
  },
  components :{
    EssentialLink :() => import('src/components/PortalEssentialLink.vue')
  },
  setup :(props) => {
    const navigate = () => {
      props.emit({
        title:props.title,
        link:props.link,
      })
    }
    return{
      navigate
    }
  }
})
</script>
