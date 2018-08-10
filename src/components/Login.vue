<template>
<mu-row>
  <mu-col span="1" md="2" sm="12"></mu-col>
    <mu-col span="10" md="8" sm="12">
      <div class="login-background"></div>
      <mu-card class="login-box" :raised="true" style="margin-top: 50%">
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
                <mu-button flat @click="clear">Reset</mu-button>
                <mu-button color="primary" @click="submit">Login</mu-button>
              </mu-form-item>
            </mu-row>
          </mu-form>
        </mu-card-text>
      </mu-card>
    </mu-col>
  <mu-col span="1" md="2" sm="12"></mu-col>
</mu-row>
</template>

<script>
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
      this.$refs.form.validate().then((result) => {
        if (!result) { return false }
        this.$http.post('login/', JSON.stringify(this.validateForm)).then(response => {
          var token = response.body.token
          this.$toast.success('Congratulations, You are login successful.')
          this.$store.commit('isLogin', token)
          this.$router.push({ name: 'todos' })
        }, response => {
          var errorMessage = response.body ? response.body.message : 'Oops! got a little problem, try again.'
          this.$toast.error(errorMessage)
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
