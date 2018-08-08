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

const EndpointRoot = 'http://' + window.location.hostname + ':' + (process.env.NODE_ENV === 'production' ? '8000' : '5000') + '/api/v1'

const URI = EndpointRoot + '/todos'

const EndpointAuth = EndpointRoot + '/login'

const HTTPCONFIG = {
  timeout: 3000,
  responseType: 'json'
}

export default new Vuex.Store({
  state,
  mutations
})

export {
  URI,
  HTTPCONFIG,
  EndpointAuth
}
