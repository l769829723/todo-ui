<template>
  <div>
    <template v-if="$store.state.signIn">
      <v-app id="inspire">
        <v-navigation-drawer
          :clipped="$vuetify.breakpoint.lgAndUp"
          v-model="drawer"
          fixed
          app
        >
          <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <v-icon class="blue lighten-1 white--text">person</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Welcome, Admin.</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-list dense two-line>
            <v-list-tile ripple :active-class="selected" :to="{ name: 'todos' }" @click="clickedList">
              <v-list-tile-action>
                <v-icon>receipt</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>TODOS</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile ripple :to="{ name: 'posts' }">
              <v-list-tile-action>
                <v-icon>library_books</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>POSTS</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-subheader>System</v-subheader>
            <v-list-tile ripple>
              <v-list-tile-action>
                <v-icon>settings</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>SETTINGS</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-subheader>User</v-subheader>
            <v-list-tile ripple @click="logOut">
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>LOGOUT</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          color="blue darken-3"
          dark
          app
          fixed
        >
          <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <span class="hidden-sm-and-down">PyDeer</span>
          </v-toolbar-title>
          <v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="search"
            label="Search"
            class="hidden-sm-and-down"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>apps</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>notifications</v-icon>
          </v-btn>
          <v-btn icon large>
            <v-avatar size="32px" tile>
              <img
                src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                alt="Vuetify"
              >
            </v-avatar>
          </v-btn>
        </v-toolbar>
        <v-content>
          <v-container fluid fill-height>
            <v-layout justify-center align-center>
              <router-view></router-view>
            </v-layout>
          </v-container>
        </v-content>
      </v-app>
    </template>
    <template v-else>
      <v-app id="inspire">
        <v-content>
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <router-view></router-view>
            </v-layout>
          </v-container>
        </v-content>
      </v-app>
    </template>
  </div>
  <!-- <div>
    <template v-if="$store.state.signIn">
      <mu-appbar style="width: 100%;position: fixed;z-index: 2;" color="primary">
        TODOS
        <mu-button flat slot="right" :to="{name: 'todos'}">Home</mu-button>
        <mu-button flat slot="right" :to="{name: 'channels'}">Channels</mu-button>
        <mu-button flat slot="right" href="http://localhost:5000/" target="_blank">Go Site</mu-button>
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
          <mu-col span="12" md="2" sm="12"></mu-col>

          <mu-col span="12" md="8" sm="12">
            <router-view/>
          </mu-col>

          <mu-col span="12" md="2" sm="12"></mu-col>
        </mu-row>
      </mu-container>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div> -->
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    selected: 'primary--text'
  }),
  watch: {
    'store.state.signIn' () {
      console.log('Is changed.')
    }
  },
  methods: {
    logOut () {
      this.$store.commit('logOut')
      this.$router.push({ name: 'login' })
    },
    clickedList (e) {
    }
  }
}
// export default {
//   name: 'App',
//   data () {
//     return {
//       user: {
//         picture: ''
//       }
//     }
//   },
//   created () {
//     this.getUserInfo()
//   },
//   methods: {
//     logOut () {
//       this.$store.commit('logOut')
//       this.$router.push({ name: 'login' })
//     },
//     profile () {
//       this.$router.push({ name: 'profile' })
//     },
//     getUserInfo () {
//       if (this.$store.state.signIn) {
//         this.$http.get('login/me/').then(response => {
//           this.user = response.body
//           this.user.picture = ''
//         })
//       }
//     }
//   }
// }
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
