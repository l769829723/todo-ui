<template>
  <div style="margin-top: 200px">
    <div class="login-background"></div>
    <mu-card class="login-box" :raised="true">
      <mu-card-header title="WELCOME" sub-title="Please sign in">
      </mu-card-header>
      <mu-card-text>
        <mu-form ref="form" :model="validateForm">
          <mu-form-item icon="account_circle" label="E-mail" help-text="Enter your email." prop="username" :rules="usernameRules">
            <mu-text-field autocomplete="username" v-model="validateForm.username" prop="username" placeholder="e.g: simple@example.com" autofocus></mu-text-field>
          </mu-form-item>
          <mu-form-item icon="lock" label="Password" prop="password" :rules="passwordRules">
              <mu-text-field autocomplete="current-password" type="password" v-model="validateForm.password" prop="password" placeholder="Your password"></mu-text-field>
          </mu-form-item>
          <mu-row justify-content="end">
            <mu-form-item>
              <mu-button @click="clear">Reset</mu-button>
              <mu-button color="primary" @click="submit">Login</mu-button>
            </mu-form-item>
          </mu-row>
        </mu-form>
      </mu-card-text>
    </mu-card>
  </div>
</template>

<script>
import { HTTPCONFIG, EndpointAuth } from '@/global.js'
export default {
  data () {
    return {
      usernameRules: [
        {validate: (val) => !!val && val.length >= 5, message: 'Please type your email.'},
        {validate: (val) => !!RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$').test(val), message: 'Invalid E-mail address.'}
      ],
      passwordRules: [
        {validate: (val) => !!val, message: 'Please type your password'}
      ],
      validateForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      console.log(EndpointAuth)
      this.$refs.form.validate().then((result) => {
        if (!result) { return false }
        this.$http.post(EndpointAuth + '/', JSON.stringify(this.validateForm), HTTPCONFIG).then(response => {
          var token = response.body.token
          this.$store.dispatch('successNotify', 'Congratulations, You are login successful.')
          this.$store.commit('isLogin', token)
          this.$router.push({ name: 'todos' })
        }, response => {
          var errorMessage = response.body ? response.body.message : 'error'
          this.$store.dispatch('alertNotify', errorMessage)
        })
      })
    },
    clear () {
      this.$refs.form.clear()
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$cookies.get('session') !== undefined ? vm.$router.push({ name: from.name }) : vm.$router.push({ name: to.name })
    })
  }
}
</script>

<style lang="postcss" scoped>
.login-background {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-image: url('../assets/bg4.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(1.5px);
  // transform:rotate(376deg);
  z-index: -1;
}

.login-box {
  filter: opacity(95%);
}
</style>
