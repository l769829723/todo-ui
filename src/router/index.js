import Vue from 'vue'
import Router from 'vue-router'
import ToDoList from '@/components/ToDoList'
import Login from '@/components/Login'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todos',
      component: ToDoList,
      meta: {
        protected: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        protected: true
      }
    }
  ]
})
