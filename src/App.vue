<template>
  <div>
    <mu-appbar style="width: 100%;position: fixed;z-index: 2;" color="primary" v-if="$store.state.signIn">
      TODOS
      <mu-button flat slot="right" :to="{name: 'todos'}">Home</mu-button>
      <mu-menu slot="right" open-on-hover>
        <mu-button flat>Welcome, {{ user.username }}.</mu-button>
      </mu-menu>
      <mu-menu style="margin-top: 15px" slot="right" open-on-hover placement="bottom-end">
        <mu-row justify-content="center">
          <mu-avatar :size="48" color="primary">
            <img :src="user.picture" v-if="user.picture !== ''">
            <mu-icon value="account_circle" v-else></mu-icon>
          </mu-avatar>
        </mu-row>
        <mu-list slot="content">
          <mu-list-item button @click="profile()">
            <mu-icon value="description"></mu-icon>
            <mu-list-item-title>Profile</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-icon value="settings"></mu-icon>
            <mu-list-item-title>Settings</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="logOut()">
            <mu-icon value="exit_to_app"></mu-icon>
            <mu-list-item-title>Sign out</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-container>
      <mu-row>
        <mu-col span="1" md="2" sm="1"></mu-col>

        <mu-col span="10" md="8" sm="10">
          <router-view/>
        </mu-col>

        <mu-col span="1" md="2" sm="1"></mu-col>
      </mu-row>
    </mu-container>

    <mu-snackbar :color="$store.state.notify.color" :open.sync="$store.state.showNotify">
      <mu-icon left :value="$store.state.notify.icon"></mu-icon>
      {{$store.state.notify.message}}
      <mu-button flat slot="action" color="#fff" @click="$store.commit('toogleNotify', false)">CLOSE</mu-button>
    </mu-snackbar>

  </div>
</template>

<script>
import { EndpointAuth, HTTPCONFIG } from '@/global.js'
export default {
  name: 'App',
  data () {
    return {
      user: {
        picture: ''
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    logOut () {
      this.$store.commit('logOut')
      this.$router.push({ name: 'login' })
    },
    profile () {
      this.$router.push({ name: 'profile' })
    },
    getUserInfo () {
      if (this.$store.state.signIn) {
        this.$http.get(EndpointAuth + '/me/', HTTPCONFIG).then(response => {
          this.user = response.body
          this.user.picture = ''
        })
      }
    }
  }
}
</script>

<style>
/* body,html:before {
  filter: blur(1.5px);
  -webkit-filter: blur(1.5px);
  z-index: -1;
  position: absolute;
} */

body,html {
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
