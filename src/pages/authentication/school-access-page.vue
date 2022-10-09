<template>
  <q-page padding>
    <!-- content -->
    <div class="fit row wrap justify-center items-start content-start">
      <div class="col-lg-5 col-md-8 col-sm-12 col-xs-12 self-center" style="padding-top: 85px;">
        <q-card flat>
          <q-card-section class="fit row wrap justify-center items-start content-start">
            <span style="cursor: pointer;" @click="$router.push({name:'index'})">
              <u style="color: #21BA45; font-size: 33px">Study</u>
              <sub style="color: #1976D2; font-size: 22px">Line</sub>
              <br/>
              <span style="font-size: 1em">
                SCHOOL PORTAL
              </span>
            </span>
          </q-card-section>
          <q-card-section v-if="is_access_form" class="fit row wrap justify-center items-start content-start">
            <q-list class="col-lg-8 col-md-8 col-sm-12 col-xs-12 self-center">
              <q-item-label class="text-center text-uppercase text-primary" overline>
                Access existing school with school code
              </q-item-label>
              <q-separator spaced/>
              <q-space/>
              <q-item>
                <q-item-section>
                  <q-input
                    filled
                    v-model="access.code"
                    label="School code"
                    dense
                    lazy-rules
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input
                    filled
                    v-model="access.access_key"
                    label="School access key"
                    dense
                    lazy-rules
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-btn color="primary" @click="onSubmit" size="sm" icon="link" label="connect"/>
                </q-item-section>
              </q-item>
              <q-separator spaced/>

              <q-item-label class="text-center" caption>
                -OR- <br/>create a school below
              </q-item-label>
              <q-item>
                <q-item-section>
                  <q-btn stack color="primary" @click="is_access_form=false" flat size="sm" icon="add"
                         label="Create new school"/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section v-else class="fit row wrap justify-center items-start content-start">
            <q-list class="col-lg-12 col-md-12 col-sm-12 col-xs-12 self-center">
              <q-item-label class="text-center text-uppercase text-primary" overline>
                Create new school and generate school code
              </q-item-label>
              <q-separator spaced/>
              <q-space/>
              <q-item>
                <q-item-section>
                  <q-input
                    filled
                    v-model="input.name"
                    label="School name"
                    dense
                    lazy-rules
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input
                    filled
                    v-model="input.email"
                    label="email"
                    dense
                    lazy-rules
                  />
                </q-item-section>
                <q-item-section>
                  <q-input
                    filled
                    v-model="input.phone"
                    label="Phone"
                    dense
                    lazy-rules
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input
                    filled
                    v-model="input.address"
                    label="School address"
                    dense
                    lazy-rules
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input
                    filled
                    v-model="input.state"
                    label="state"
                    dense
                    lazy-rules
                  />
                </q-item-section>
                <q-item-section>
                  <q-input
                    filled
                    v-model="input.country"
                    label="country"
                    dense
                    lazy-rules
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-card class="no-padding" flat bordered>
                    <q-card-section>
                      <q-item-label class="text-center text-uppercase text-primary" overline>
                        administrator account
                      </q-item-label>
                      <q-item>
                        <q-item-section>
                          <q-input
                            filled
                            disable
                            v-model="input.email"
                            label="email"
                            dense
                            lazy-rules
                          />
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-input
                            filled
                            v-model="input.admin.re_password"
                            label="password"
                            dense
                            lazy-rules
                          />
                        </q-item-section>
                        <q-item-section>
                          <q-input
                            filled
                            v-model="input.admin.password"
                            label="confirm password"
                            dense
                            lazy-rules
                          />
                        </q-item-section>
                      </q-item>
                    </q-card-section>
                  </q-card>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-btn @click="onSubmit" color="teal" size="sm" icon="add" label="create"/>
                </q-item-section>
              </q-item>
              <q-separator spaced/>

              <q-item-label class="text-center" caption>
                -OR- <br/>access existing school below
              </q-item-label>
              <q-item>
                <q-item-section>
                  <q-btn stack color="primary" @click="is_access_form=true" flat size="sm" icon="link" label="Access"/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue"
import apis from "src/constants/apis"
import { rest } from "boot/axios"
import { notifications } from "boot/notification"
import { useRouter } from "vue-router/dist/vue-router"
import { useAuthStore } from "stores/auth"

export default {
  // name: 'PageName',
  setup :() => {
    const auth = useAuthStore()
    const router = useRouter()
    const is_access_form = ref(true)
    const input = ref({
      name :'adeyemo international',
      address :'46 The Polygon',
      email :'deen2@mailinator.com',
      phone :'07417398388',
      country :'United Kingdom',
      state :'Southampton',
      admin :{
        password :'123456789',
        re_password :'123456789'
      }
    })
    let access = ref({
      code :'SL-MAA-0000001',
      access_key :'XGCN1RUECR0SMBO6H6IXMTVRQ'
    })
    const onSubmit = async () => {
      let school = null
      if(is_access_form.value){
        school = await rest.post(apis.public.school.access, {...access.value})
      } else {
        input.value.admin.email = input.value.email
        school = await rest.post(apis.public.school.register, {...input.value})
      }
      if(school.status){
       await window.localStorage.setItem(process.env.schoolToken, school.data._id)
        auth.setSchool(school.data)
        notifications.positive(is_access_form ? 'school accessed' : 'school created')
        await router.push({name :'sign-in'})
      }
    }
    return {is_access_form, input, access, onSubmit}
  }
}
</script>
