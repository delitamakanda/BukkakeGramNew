<template>
  <div class="app-chat">
    <bukkake-header :user="user" />
    <h1>Chatbox</h1>
  </div>
</template>

<script>
import Header from '../components/Header'
import { mapGetters } from 'vuex'
export default {
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