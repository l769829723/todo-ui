// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueResource from 'vue-resource'
import VueTimeago from 'vue-timeago'
import VueCookies from 'vue-cookies'

import store from '@/global.js'

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(VueResource)
Vue.use(VueTimeago)
Vue.use(VueCookies)

Vue.http.interceptors.push(function (request) {
  // modify headers
  if (this.$cookies.get('session')) {
    request.headers.set('X-APP-TOKEN', 'Token ' + this.$cookies.get('session'))
  }
  // return response callback
  return function (response) {
    if (response.status === 401) {
      this.$store.commit('logOut')
      this.$router.push({name: 'login'})
      this.$store.dispatch('alertNotify', 'Your session has timed out, please re-login.')
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
  components: { App },
  template: '<App/>'
})
