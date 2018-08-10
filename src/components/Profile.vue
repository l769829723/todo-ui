<template>
  <mu-row justify-content="center">
    <mu-container style="margin: 90px 0 20px 0">
      <mu-row v-if="showStep">
        <mu-card style="width: 100%;margin: 20px 0">
          <mu-row justify-content="start">
            <mu-stepper :active-step="stepCount">
              <mu-step>
                <mu-step-label>
                  Identity yourself
                </mu-step-label>
              </mu-step>
              <mu-step>
                <mu-step-label>
                  Finished
                </mu-step-label>
              </mu-step>
            </mu-stepper>
            <mu-container v-if="!finished">
              <mu-row justify-content="center">
                <mu-form ref="identity" :model="identityForm" class="mu-demo-form">
                  <mu-form-item icon="person" label="Account" prop="username">
                      <mu-text-field autocomplete="off" v-model="identityForm.username" type="text"  prop="username" disabled></mu-text-field>
                  </mu-form-item>
                  <mu-form-item icon="lock" label="Password" prop="password" :rules="passwordRules">
                      <mu-text-field autocomplete="new-password" autofocus type="password" v-model="identityForm.password" prop="password"></mu-text-field>
                  </mu-form-item>
                </mu-form>
              </mu-row>
              <mu-row justify-content="end">
                <mu-button color="primary" @click="checkIdentity()">
                  <mu-icon left value="perm_identity"></mu-icon>
                  CHECK
                </mu-button>
              </mu-row>
            </mu-container>
            <mu-container v-else>
              <mu-row justify-content="center">
                <template v-if="identityPass">
                  <mu-icon value="check_circle"></mu-icon>&nbsp;
                  <a color="green" href="javascript:;" @click.stop="showProfile()">&nbsp;Next</a>&nbsp;&nbsp;to update your profile.
                </template>
              </mu-row>
            </mu-container>
          </mu-row>
          <br>
        </mu-card>
      </mu-row>
      <mu-row v-else>
        <mu-card style="width: 100%; margin: 0 auto;">
          <mu-card-header :title="profileForm.username" sub-title="profile of user.">
            <mu-avatar slot="avatar">
              <img :src="profileForm.image">
            </mu-avatar>
          </mu-card-header>
          <!-- <mu-card-media title="Header" sub-title="Your header picture.">
            <img :src="user.image">
          </mu-card-media> -->
          <mu-card-title title="Update" sub-title="for your profile."></mu-card-title>
          <mu-card-text>
            <mu-form ref="profile" :model="profileForm" label-position="top">
              <mu-form-item icon="email" prop="email" label="Email Address">
                <mu-text-field autocomplete="email" prop="email" v-model="profileForm.email" suffix="Email can't modify." disabled></mu-text-field>
              </mu-form-item>
              <mu-form-item icon="account_circle" label="Username" help-text="Please input your username." prop="username" :rules="passwordRules">
                <mu-text-field type="text" autocomplete="username" v-model="profileForm.username" prop="username" autofocus></mu-text-field>
              </mu-form-item>
              <mu-form-item icon="lock" prop="password" label="New Password" help-text="Please input your password."  :rules="passwordRules">
                <mu-text-field type="password" prop="password" v-model="profileForm.password" autocomplete="new-password"></mu-text-field>
              </mu-form-item>
              <mu-form-item icon="lock" prop="confirm" label="Confirm New Password" :rules="confirmRules">
                <mu-text-field type="password" prop="confirm" v-model="profileForm.confirm" autocomplete="confirm-password"></mu-text-field>
              </mu-form-item>
            </mu-form>
          </mu-card-text>
          <mu-card-actions>
            <mu-row justify-content="end">
              <mu-button flat color="gray" @click="reset">
                <mu-icon value="delete"></mu-icon>
                RESET
              </mu-button>
              <mu-button flat color="primary" @click="updateProfiel">
                SAVE
                <mu-icon right value="save"></mu-icon>
              </mu-button>
            </mu-row>
          </mu-card-actions>
        </mu-card>
      </mu-row>
    </mu-container>
  </mu-row>
</template>

<script>
export default {
  data () {
    return {
      showStep: true,
      stepCount: 0,
      user: {},
      identityPass: false,
      stepContent: '',
      passwordRules: [
        { validate: (val) => !!val && val.length >= 3, message: 'Invalid username or password.' }
      ],
      confirmRules: [
        { validate: (val) => !!val && val.length >= 3 && val === this.profileForm.password, message: 'Please confirm your password.' }
      ],
      identityForm: {
        username: '',
        password: ''
      },
      profileForm: {
        email: '',
        username: '',
        password: '',
        confirm: ''
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  computed: {
    finished () {
      return this.stepCount >= 1
    }
  },
  watch: {
    user () {
      this.identityForm.username = this.user.email
    }
  },
  methods: {
    checkIdentity () {
      this.$refs.identity.validate().then((ret) => {
        if (!ret) { return false }
        this.$http.post('login/', JSON.stringify(this.identityForm)).then(response => {
          this.stepCount += 1
          this.identityPass = true
        })
      })
    },
    getUserInfo () {
      this.$http.get('login/me/').then(response => {
        this.user = response.body
      })
    },
    showProfile () {
      this.showStep = false
      this.profileForm = this.user
    },
    reset () {
      this.$refs.profile.clear()
    },
    updateProfiel () {
      this.$refs.profile.validate().then((result) => {
        if (!result) { return false }
        var info = {
          username: this.profileForm.username,
          old_password: this.identityForm.password,
          new_password: this.profileForm.password
        }
        this.$http.post('login/me/', JSON.stringify(info)).then(response => {
          this.$store.commit('logOut')
          this.$router.push({ name: 'login' })
          this.$toast.success('Your password already updated, please re-login.')
        }, response => {
          this.$toast.error('Error, please check your profile info.')
        })
      })
    }
  }
}
</script>
