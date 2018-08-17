<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Welcome to login!</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="loginForm.valid">
          <v-text-field
            v-model="loginForm.username"
            prepend-icon="person"
            label="Email"
            type="text"
            :rules="usernamelRules"
            autofocus>
          </v-text-field>
          <v-text-field
            v-model="loginForm.password"
            autocomplete="off"
            prepend-icon="lock"
            label="Password"
            :rules="passwordRules"
            type="password">
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="clear">Reset</v-btn>
        <v-btn @click="submit" color="primary">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      loginForm: {
        valid: true,
        username: '',
        password: ''
      },
      username: '',
      usernamelRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$http.post('login/', JSON.stringify(this.loginForm)).then(response => {
          var token = response.body.token
          this.$store.commit('isLogin', token)
          this.$http.get('login/me/').then(response => {
            this.$store.commit('setUserInfo', response.body)
          })
          this.$router.push({ name: 'todos' })
          this.$toasted.show('Congratulations, You are login successful.')
        }, response => {
          var errorMessage = response.body ? response.body.message : 'Oops! got a little problem, try again.'
          this.$toasted.show(errorMessage)
        }).catch(error => {
          console.log(error)
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$cookies.get('session') !== undefined ? vm.$router.push({ name: from.name }) : vm.$router.push({ name: to.name })
    })
  }
}
</script>
