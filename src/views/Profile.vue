<template>
  <div class="app-profile">
    <bukkake-header :user="user" :infos="profile" />
    <h1>Profile</h1>
    {{ user }}
    <form action="" class="form-horizontal">
        <div class="form-group row" v-for="(val,key) in userForm" :key="key">
          <label for="" class="col-3 col-form-label text-right">{{ key | unCamelCase(key)}} : </label>
          <div class="col-6">
            <input class="form-control"
                   :type="userForm[key].type"
                   v-model="userForm[key].value"
                   @keyup.enter.prevent="edit"
                   @keyup="clear(key)">
            <p class="small text-danger" v-if="errors[key]">{{errors[key]}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
          </div>
          <div class="col-6">
            <p class="small text-danger" v-if="errors.non_field_errors">{{ errors.non_field_errors}}</p>
            <button @click.prevent='edit' class="btn btn-outline-success float-right">Edit</button>
          </div>
        </div>
    </form>
    {{ profile }}
    <form action="" class="form-horizontal">
        <div class="form-group row" v-for="(val,key) in profileForm" :key="key">
          <label for="" class="col-3 col-form-label text-right">{{ key | unCamelCase(key)}} : </label>
          <div class="col-6">
            <input class="form-control"
                   :type="profileForm[key].type"
                   v-model="profileForm[key].value"
                   @change="handleFileUpload($event)"
                   @keyup.enter.prevent="update"
                   @keyup="clear(key)">
            <p class="small text-danger" v-if="errors[key]">{{errors[key]}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
          </div>
          <div class="col-6">
            <p class="small text-danger" v-if="errors.non_field_errors">{{ errors.non_field_errors}}</p>
            <button @click.prevent='update' class="btn btn-outline-success float-right">Update</button>
          </div>
        </div>
    </form>
  </div>
</template>

<script>
import Header from '../components/Header'
import { mapGetters, mapActions, mapState } from 'vuex'
import { format } from 'date-fns'
export default {
  data() {
    return {
      userForm: {
        username: {
          value: '',
          type: 'text'
        },
        email: {
          value: '',
          type: 'email'
        },
        first_name: {
          value: '',
          type: 'text'
        },
        last_name: {
          value: '',
          type: 'text'
        },
      },
      profileForm: {
        date_of_birth: {
          value: '',
          type: 'date'
        },
        photo: {
          value: null,
          type: 'file'
        },
        bio: {
          value: '',
          type: 'text'
        }
      }
    }
  },
  created() { },
  mounted() {
    this.userForm.username.value = this.user.username;
    this.userForm.email.value = this.user.email;
    this.userForm.first_name.value = this.user.first_name;
    this.userForm.last_name.value = this.user.last_name;

    this.profileForm.date_of_birth.value = this.profile.date_of_birth;
    // this.profileForm.photo.value = this.profile.photo;
    this.profileForm.bio.value = this.profile.bio;
  },
  computed: {
    ...mapGetters('auth', ['user', 'profile']),
    ...mapState('auth', ['errors']),
  },
  methods: {
    ...mapActions('auth', ['updateUserProfile', 'updateUser', 'clearErrors', 'updateUserProfile']),
    edit() {
      const data = {
        username: this.userForm.username.value,
        email: this.userForm.email.value,
        first_name: this.userForm.first_name.value,
        last_name: this.userForm.last_name.value,
        userId: this.user.id
      }
      
      this.updateUser(data);
    },
    update() {
      const data = {
        date_of_birth: format(new Date(this.profileForm.date_of_birth.value), 'yyyy-MM-dd'),
        photo: this.profileForm.photo.value,
        bio: this.profileForm.bio.value,
        userId: this.user.id
      }

      this.updateUserProfile(data);
    },
    clear(field) {
      this.clearErrors(field)
    },
    handleFileUpload(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (files === null || files || files === undefined) { return; }
      this.profileForm.photo.value = files[0];
    },
    renderUserField(field) {
      this.userForm.username.value = field.username;
      this.userForm.email.value = field.email;
      this.userForm.first_name.value = field.first_name;
      this.userForm.last_name.value = field.last_name;

    },
    renderProfileField(field) {
      this.profileForm.date_of_birth.value = field.date_of_birth;
      // this.profileForm.photo.value = field.photo;
      this.profileForm.bio.value = field.bio;
    }
  },
  watch: {
    user(val) {
      this.renderUserField(val);
    },
    profile(val) {
      this.renderProfileField(val);
    }
  },
  components: {
    'bukkake-header': Header
  }
}
</script>

<style lang="scss">

</style>
