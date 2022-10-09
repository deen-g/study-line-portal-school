import { defineStore } from 'pinia'
import { bus } from 'boot/global-event-bus'
// eslint-disable-next-line no-unused-vars
export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: {},
    school: {}
  }),

  getters: {
    isLoggedIn (state) {
      return Object.prototype.hasOwnProperty.call(state.auth, '_id')
    },
    isVerified (state) {
      return true
    },
    getRole (state) {
      return state.auth.role
    },
    getRoleAbilities (state) {
      return state.auth.role.ability_ids
    },
    getSchool (state) {
      return state.school
    },
    hasSchool (state) {
      return Object.prototype.hasOwnProperty.call(state.school, '_id')
    },
    accountId (state) {
      return state.auth._id
    },
    getAccount (state) {
      return state.auth
    },
  },

  actions: {
    clearAuthUser () {
      bus.$emit('emit:account:authenticate', false)
      this.auth = {}
    },
    setAuthUser (data) {
      bus.$emit('emit:account:authenticate', Object.hasOwnProperty.call(data, '_id'))
      if (data.name) {
        const matches = data.name.match(/\b(\w)/g)
        data.acronym = matches.join('')
      }
      console.info(data.role)
      this.auth = data
    },
    setVerification (data) {
      let auth = this.auth
      auth.is_verified = data.is_verified
      this.auth = auth
    },
    setSchool (data) {
      this.school = data
    },
  }
})
