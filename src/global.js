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
  },
  toogleNotify (state, toogle) {
    state.showNotify = toogle
  },
  updateNotify (state, content) {
    state.notify = content
  }
}

const actions = {
  closeNotify (context) {
    setTimeout(() => {
      context.commit('toogleNotify', false)
    }, 3000)
  },
  alertNotify (context, msg) {
    var content = {
      color: 'red',
      icon: 'clear',
      message: msg
    }
    context.commit('updateNotify', content)
    context.commit('toogleNotify', true)
    context.dispatch('closeNotify')
  },
  successNotify (context, msg) {
    var content = {
      color: 'green',
      icon: 'check',
      message: msg
    }
    context.commit('updateNotify', content)
    context.commit('toogleNotify', true)
    context.dispatch('closeNotify')
  }
}

const EndpointRoot = 'http://' + window.location.hostname + ':5000/api/v1'

const URI = EndpointRoot + '/todos'

const EndpointAuth = EndpointRoot + '/login'

const HTTPCONFIG = {
  timeout: 3000,
  responseType: 'json'
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})

export {
  URI,
  HTTPCONFIG,
  EndpointAuth
}
