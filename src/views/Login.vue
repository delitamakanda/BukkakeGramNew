<template>
  <div class="app-login">
    <div class="container p-lg-5 m-lg-5">
      <h1 class="py-3 text-center">Login</h1>
      <form action="" class="form-horizontal">
        <div class="form-group row" v-for="(val,key) in loginForm" :key="key">
          <label for="" class="col-3 col-form-label text-right">{{ key | unCamelCase(key)}} : </label>
          <div class="col-6">
            <input class="form-control"
                   :type="loginForm[key].type"
                   v-model="loginForm[key].value"
                   @keyup.enter.prevent="authenticate"
                   @keyup="clear(key)">
            <p class="small text-danger" v-if="errors[key]">{{errors[key]}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
          </div>
          <div class="col-6">
            <p class="small text-danger" v-if="errors.non_field_errors">{{ errors.non_field_errors}}</p>
            <button @click.prevent='authenticate' class="btn btn-outline-success float-right">Login</button>
          </div>

        </div>

        <div class="row pt-3">
          <div class="col-3"></div>
          <div class="col-6">
            <p class="small text-right">Don't have account ?
              <router-link :to="{'name':'Register'}">Register</router-link>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data () {
    return {
      loginForm: {
        username: {
          value: '',
          type: 'text'
        },
        password: {
          value: '',
          type: 'password'
        },
      },
    }
  },
  computed: {
    ...mapState('auth', ['errors']),
  },
  methods: {
    ...mapActions('auth', ['login', 'clearErrors']),
    authenticate() {
      const data = {
        username: this.loginForm.username.value,
        password: this.loginForm.password.value,
      }

      this.login(data);
    },
    clear(field) {
      this.clearErrors(field)
    },
  }
}
</script>
