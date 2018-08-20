<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <template v-if="$store.state.signIn">
      <v-app id="inspire">
        <v-navigation-drawer
          :clipped="$vuetify.breakpoint.lgAndUp"
          v-model="drawer"
          fixed
          app>
          <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <v-icon class="blue lighten-1 white--text">person</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{whoAmI}}'s console.</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-list dense two-line>
            <v-list-tile ripple :active-class="selected" :to="{ name: 'todos' }">
              <v-list-tile-action>
                <v-icon>poll</v-icon>
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
            <v-list-tile ripple :to="{ name: 'channels' }">
              <v-list-tile-action>
                <v-icon>view_day</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>CHANNELS</v-list-tile-title>
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
          fixed>
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
            <v-layout fill-height justify-center align-center>
              <!-- <v-breadcrumbs divider="/">
                <v-breadcrumbs-item
                  v-for="link in navigationLinks"
                  :key="link.text"
                  :disabled="link.disabled"
                >
                  {{ link.text }}
                </v-breadcrumbs-item>
              </v-breadcrumbs> -->
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
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    user: {
      username: 'Administrator'
    },
    selected: 'primary--text'
  }),
  computed: {
    whoAmI () {
      return this.$store.state.user.username
    }
  },
  methods: {
    logOut () {
      this.$store.commit('logOut')
      this.$router.push({ name: 'login' })
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
