import Vue from 'vue'
import Router from 'vue-router'
import ToDoList from '@/components/ToDoList'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Channels from '@/components/Channels'
import Posts from '@/components/Posts'
import MarkdownEditor from '@/components/Markdown'
import PostDetail from '@/components/PostDetail'

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
      path: '/channels',
      name: 'channels',
      component: Channels,
      meta: {
        protected: true
      }
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts,
      meta: {
        protected: true
      }
    },
    {
      path: '/posts/:id',
      name: 'postDetail',
      component: PostDetail,
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
      path: '/editor',
      name: 'editor',
      component: MarkdownEditor
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
