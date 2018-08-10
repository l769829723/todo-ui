import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: '',
  signIn: false,
  user: {},
  showNotify: false,
  notify: {
    color: 'green',
    icon: 'check',
    message: 'Hello, Vue.'
  }
}

const mutations = {
  isLogin (state, token) {
    state.token = token
    state.signIn = true
    Vue.cookies.set('session', token)
  },
  logOut (state) {
    state.token = ''
    state.signIn = false
    Vue.cookies.remove('session')
  },
  setUserInfo (state, user) {
    this.user = user
  }
}

export default new Vuex.Store({
  state,
  mutations
})
