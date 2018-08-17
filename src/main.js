// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import VueTimeago from 'vue-timeago'
import VueCookies from 'vue-cookies'
import Toasted from 'vue-toasted'
import VueProgressBar from 'vue-progressbar'

import store from '@/store/index.js'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'muse-ui/dist/muse-ui.css'
import '@/assets/main.css'

Vue.config.productionTip = false
Vue.use(Toasted, {
  position: 'bottom-right',
  theme: 'primary',
  duration: 3000,
  icon: 'notifications_active',
  action: {
    class: 'white--text',
    text: 'Close',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  }
})
Vue.use(Vuetify)
Vue.use(VueResource, {
  timeout: 60,
  responseType: 'json'
})
Vue.use(VueTimeago)
Vue.use(VueCookies)
Vue.use(VueProgressBar, {
  color: '#FF4081',
  failedColor: 'red',
  height: '2px'
})

Vue.http.options.root = (process.env.NODE_ENV === 'production' ? 'https://' : 'http://') + window.location.hostname + ':' + (process.env.NODE_ENV === 'production' ? '8000' : '5000') + '/api/v1'

Vue.http.interceptors.push(function (request) {
  // show loading bar
  this.$Progress.start()
  // modify headers
  if (this.$cookies.get('session')) {
    request.headers.set('X-APP-TOKEN', 'Token ' + this.$cookies.get('session'))
  }
  // return response callback
  return function (response) {
    if (!response.ok) {
      // Request failed
      // console.clear()
    }
    // close loading bar
    this.$Progress.finish()
    if (response.status === 500) {
      this.$toasted.info('Oops, got an unknown problem, please retry!')
    }
    if (this.$router.history.current.name !== 'login') {
      if (response.status === 401) {
        this.$store.commit('logOut')
        this.$router.push({ name: 'login' })
        this.$toasted.info('Your session has timed out, please re-login.')
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.protected)) {
    var session = Vue.cookies.get('session') || ''
    if (session === '') {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      store.commit('isLogin', session)
      // Verify the token is invalid on each request.
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  beforeCreate () {
    this.$Progress.start()
  },
  mounted () {
    this.$Progress.finish()
  }
})
