<template>
  <div class="app-profile">
    <bukkake-header :user="user" />
    <h1>Profile</h1>
    <div>
      {{ user }}
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  components: {
    'bukkake-header': Header
  }
}
</script>

<style lang="scss">

</style>
