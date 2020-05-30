<template>
  <div class="app-rgister">
    <h1>Register</h1>
    <form action class enctype="multipart/form-data">
      <div class="form-group row" v-for="(val, key) in signupForm" :key="key">
        <label for class="col-3 col-form-label text-right">{{key | unCamelCase(key)}} :</label>
        <div class="col-6">
          <input
            class="form-control"
            :type="signupForm[key].type"
            v-model="signupForm[key].value"
            @keyup.prevent="clear(key)"
            @keyup.enter.prevent="register"
          />
          <p class="small text-danger" v-if="errors[key]">{{errors[key]}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <p class="small text-danger" v-if="errors.non_field_errors">{{errors.non_field_errors}}</p>
          <button @click.prevent="register" class="btn btn-outline-success float-right">Signup</button>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-3"></div>
        <div class="col-6">
          <p class="small text-right">
            Already have account ?
            <router-link :to="{'name':'Login'}">Login</router-link>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      signupForm: {
        username: {
          value: "",
          type: "text"
        },
        email: {
          value: "",
          type: "email"
        },
        password: {
          value: "",
          type: "password"
        },
        password2: {
          value: "",
          type: "password"
        }
      }
    };
  },
  computed: {
    ...mapState("auth", ["errors"])
  },
  methods: {
    ...mapActions("auth", ["signup", "clearErrors"]),
    register() {
      const data = {
        username: this.signupForm.username.value,
        email: this.signupForm.email.value,
        password: this.signupForm.password.value,
        password2: this.signupForm.password2.value
      };

      this.signup(data);
    },
    clear(field) {
      this.clearErrors(field);
    }
  }
};
</script>